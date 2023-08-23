# 获得Apple Music 歌单数据

安装:
```
npm i get-apple-music-playlist
```

使用:
```
import {getPlayList} from "get-apple-music-playlist"


export default async function Page(){
    const playlist= await getPlayList(url)
    
    //url: 歌单链接 
    //other code
}
```
playlist:
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
