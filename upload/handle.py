# -*- coding: utf-8 -*-
# generate by new_app on 2020/05/12 09:38

import os
import time
from core.web import WebHandler, HtmlResponse, Response, JsonResponse
from core.helpers import PostDataManager


class BB(WebHandler):
    async def get(self):
        return HtmlResponse("upup.html")

    async def post(self):
        xd = PostDataManager(self.request, self.reader, buf_size=65535)
        async for x in xd.handle():
            if isinstance(x, dict):
                print(x)
            else:
                print(len(x))
        return Response("NMSL")


class FileList(WebHandler):
    async def get(self):
        root = self.request.GET.get("path")
        if root[0] == "\\":
            root = root[1:]
        if root and os.path.isdir(root):
            result = []
            for name in os.listdir(root):
                path = os.path.join(os.path.abspath(root), name)
                if os.path.isfile(path):
                    info = os.stat(path)
                    result.append({"typ": "file", "name": name, "size": info.st_size,
                                   "mtime": time.strftime("%y/%m/%d %H:%M:%S")})
                elif os.path.isdir(path):
                    result.append({"typ": "dir", "name": name})
                else:
                    result.append({"typ": "unknown", "name": name})
            return JsonResponse({
                "error": False,
                "data": result
            }, header={"Access-Control-Allow-Origin": "*"})
        else:
            return JsonResponse({"error": True, "msg": "404 not found"})
