import os
from .mimetype import get_type
from .web import http404, StreamResponse, http304, http400, WebHandler, Response
from .utils import File, timestamp_toCookie, parse_range
from .const_var import work_directory

### CONST DEFINE ###
static_path = os.path.join(work_directory, "static/")

### SERVER HANDLERS ###
class static(WebHandler):
    async def get(self):
        request = self.request
        if request.re_args[0].find("..") != -1:
            return http400()
        path = os.path.join(static_path, request.re_args[0])
        if os.path.exists(path):
            f = File(path)
            mtime = timestamp_toCookie(f.mtime()).encode()
            if request.head.get("If-Modified-Since") == mtime:
                return http304()
            else:
                file_type = get_type(path)
                res = StreamResponse(f, content_type=file_type)
                content_range = None  # request.head.get("Range")
                if content_range:
                    start, end = parse_range(content_range, f.size)
                    f.set_range(start, end-start)
                    res.add_header({"Content-Range": f"bytes {start}-{end}/{f.size+1}"})
                    if_unmodified_since = request.head.get("If-Unmodified-Since")
                    if if_unmodified_since == mtime:
                        res.code = 200
                    elif if_unmodified_since and if_unmodified_since != mtime:
                        return Response(code=412)
                    else:
                        res.code = 206
                    res.setLen(end-start)
                else:
                    res.add_header({"Cache-Control": "no-cache",
                                    "Last-Modified": mtime.decode(),
                                    "Etag": f.mtime()})
            return res
        return http404()

