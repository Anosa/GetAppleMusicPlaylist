import axios from "axios";
let url = 'https://amp-api.music.apple.com/v1/catalog/us/playlists/pl.{link}';

const headers = {
    'Authorization': "Bearer ",
    "Origin": "https://embed.music.apple.com"
};


async function run(link:string) {
  url=url.replace("{link}",link)
  try {
    const key=await getAuthorization()
    headers.Authorization=headers.Authorization+key
    const res = await axios.get(url,{headers: headers})
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

async function getAuthorization(){
  let url="https://embed.music.apple.com/build/p-92eadb85.entry.js"
  const res = await axios.get(url)
  const regex = /Je="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ\..*?"/
  const match = res.data.match(regex);
  if (match) {
      return match[0].split('"')[1]
  }else{
    console.error("error:Authorization not found."); 
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


async function getPlayList(url:string) {
  url.includes("?l=")? url= url.split("?l=")[0] : null
  url=url.split("pl.")[1]
  const result = await run(url); 
  return result;
}

export {getPlayList}