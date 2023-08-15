# 获得Apple Music 歌单数据

```
import {getPlayList} from "get-apple-music-playlist"


export default async function Page(){
    const playlist= await getPlayList(url, authorization)

    //other code
}
```

url: 歌单链接 

authorization: 暂时只能手动获得，方法如下

https://amp-api.music.apple.com/v1/catalog/us/playlists/pl.u-{这里}

将playlist后面的id放在上面的链接
https://music.apple.com/us/playlist/{这里}

浏览器F12在网络中，找到和id相同的json，在消息头、请求头中找到authorization复制到authorization。