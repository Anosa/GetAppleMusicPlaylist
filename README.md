# 获得Apple Music 歌单数据

```
import {getPlayList} from "get-apple-music-playlist"


export default async function Page(){
    const playlist= await getPlayList(url)

    //other code
}
```
playlist：
```
curatorName: (string)，播放列表作者
name: (string)，播放列表名称
lastEditDate: (string)，上次更新日期
description: (string)，播放列表简介
playlistAvatar(w: int): (string)，播放列表封面url，默认3000
allSongs(): (array)，所有歌曲
```


allSongs()内:
```
name: (string)，歌曲名称
albumName: (string)，专辑名
genreNames: (array)，歌曲类别
releaseDate: (stirng)，发行日期
url: (string)，歌曲链接
artistName: (string)，歌手名称
artwork(w: int): (string)，歌曲封面url，默认3000
```

url: 歌单链接 

新版本实现了自动获得token并保存功能，以下说明弃用

---

 ~~authorization: 默认有一个Bearer Token。但不知道能用多长时间。手动获得方法如下：~~

~~https://music.apple.com/us/playlist/{这里}~~

~~将playlist后面的id放在下面的链接~~

~~https://amp-api.music.apple.com/v1/catalog/us/playlists/pl.u-{这里}~~

~~浏览器F12在网络中，找到和id相同的json，在消息头、请求头中找到authorization复制到authorization。~~
