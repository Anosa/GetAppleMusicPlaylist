import axios from "axios";
let url = 'https://amp-api.music.apple.com/v1/catalog/us/playlists/pl.u-{link}';

const headers = {
    'Authorization': "Bearer ",
    "Origin": "https://embed.music.apple.com"
};

const key="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNjkxMDAyMzM2LCJleHAiOjE2OTcyMjMxMzYsInJvb3RfaHR0cHNfb3JpZ2luIjpbImFwcGxlLmNvbSJdfQ.M6q_lHkvEKFi8rvnC2DtbuJ1RLTwKRYoOhsX2Vieqw184H0wKh0Tr4SWHa6WBpsxpnA5fnesVj88nJtzZ5WP8Q"


async function run(link:string, authorization:string) {
  url=url.replace("{link}",link)
  try {
    const res = await axios.get(url,{headers: headers+authorization})
    const playlistJSON = res.data.data[0];
    const info=playlistJSON.attributes;
    return {
      curatorName: info.curatorName as string,
      name: info.name as string,
      lastEditDate: info.lastModifiedDate as string,
      description: info.description.standard as string,
      playlistAvatar: function(w=3000,h=3000){
        return getImage(info.artwork.url,w,h);
      },
      playlist: function (){
        return playlistJSON.relationships.tracks.data.map((each:any)=>{
          return getSong(each)
        })
      }
    }
  } catch(error) {
    console.error("error:got playlist url wrong."); 
  }
}



function getSong(song:any){
  song= song.attributes
  return{
    name:song.name as string,
    albumName:song.albumName as string,
    genreNames:song.genreNames as string,
    releaseDate:song.releaseDate as string,
    url:song.url as string,
    artistName:song.artistName as string,
    artwork: function(url:string,w=3000,h=3000){
      return getImage(song.artwork.url,w,h)
    }
  }
}

function getImage(url:string,w:any,h:any): string{
  return url.replace("{w}", w).replace("{h}", h);
}


async function getPlayList(url:string,authorization=key) {
  url=url.split("pl.u-")[1];
  url.includes("?l=")? url= url.split("?l=")[0] : null
  const result = await run(url,authorization); 
  return result;
}

export {getPlayList}