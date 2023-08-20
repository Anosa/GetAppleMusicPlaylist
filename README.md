# 获得Apple Music 歌单数据

```
import {getPlayList} from "get-apple-music-playlist"


export default async function Page(){
    const playlist= await getPlayList(url)

    //other code
}
```

url: 歌单链接 

新版本实现了自动获得token并保存功能，以下说明弃用

---

 ~~authorization: 默认有一个Bearer Token。但不知道能用多长时间。手动获得方法如下：~~

~~https://music.apple.com/us/playlist/{这里}~~

~~将playlist后面的id放在下面的链接~~

~~https://amp-api.music.apple.com/v1/catalog/us/playlists/pl.u-{这里}~~

~~浏览器F12在网络中，找到和id相同的json，在消息头、请求头中找到authorization复制到authorization。~~
