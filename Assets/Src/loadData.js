
let img=undefined, depthMap=undefined, displacementFilter;
let imgUrl=undefined,depthURL=undefined;
let app=new PIXI.Application({ width: 1920, height: 1080 });
document.getElementById("Images").appendChild(app.view);

document.getElementById("colorFile").addEventListener("change",function(evt){
    document.getElementById("DropColorLabel").innerHTML=evt.target.files[0].name;

    img=evt.target.files[0];
show();
})
document.getElementById("depthFile").addEventListener("change",function(evt){
    document.getElementById("DropDepthLabel").innerHTML=evt.target.files[0].name;
    depthMap=evt.target.files[0];
show();
})
document.getElementById("DropColor").addEventListener("drop",function(evt){
console.log("AAAAAAAAAAAAAA");
    evt.preventDefault();
    document.getElementById("colorFile").innerHTML="evt.dataTransfer.files[0].name";
    this.style.backgroundColor="rgb(75, 104, 75)";
    if(!isValid(evt.dataTransfer.files[0].type))
    alert("El archivo "+ evt.dataTransfer.files[0].name+" no es una imagen");
    else{
    document.getElementById("DropColorLabel").innerHTML=evt.dataTransfer.files[0].name;
    console.log("Gooooooool der Beti");
    img=evt.dataTransfer.files[0];
show();
    }
})
document.getElementById("DropColor").addEventListener("dragover",function(evt){
evt.preventDefault();
this.style.backgroundColor="#D7A741";
})
document.getElementById("DropColor").addEventListener("dragleave",function(){
    this.style.backgroundColor="rgb(75, 104, 75)";
})
document.getElementById("DropColor").addEventListener("dragEnter",function(evt){
    evt.preventDefault();
this.style.backgroundColor="#D7A741";
})

document.getElementById("DropDepth").addEventListener("drop",function(evt){
    evt.preventDefault();
    this.style.backgroundColor="rgb(85, 85, 98)";
    if(!isValid(evt.dataTransfer.files[0].type))
    alert("El archivo "+ evt.dataTransfer.files[0].name+" no es una imagen");
    else{
    document.getElementById("DropDepthLabel").innerHTML=evt.dataTransfer.files[0].name;
    console.log("Ay mi madre el bicho");
    depthMap=evt.dataTransfer.files[0];
    show();
    }
})
document.getElementById("DropDepth").addEventListener("dragover",function(evt){
evt.preventDefault();
this.style.backgroundColor="#D7A741";
})
document.getElementById("DropDepth").addEventListener("dragleave",function(){
    this.style.backgroundColor="rgb(85, 85, 98)";
})
document.getElementById("DropDepth").addEventListener("dragEnter",function(evt){
    evt.preventDefault();
})
function isValid(type){
    console.log(type);
return type.includes("image/");
}

function show(){
    if(img!=undefined && depthMap!=undefined){
        let flImage=new FileReader();
            flImage.addEventListener("load",function(){
            imgUrl=flImage.result;
            if(imgUrl&&depthURL)
            showDepthImage(imgUrl,depthURL);
        });
        console.log(img);
        flImage.readAsDataURL(img);
    
        let flDepth=new FileReader();
        flDepth.addEventListener("load",function(){
            depthURL=flDepth.result;
            if(imgUrl&&depthURL)
                showDepthImage(imgUrl,depthURL);
        });
        flDepth.readAsDataURL(depthMap);
    }
}


let width = 1920;
let height = 1080;

function showDepthImage(colorUrl,depthURL) {
let imgSprite, depthMapSprite;
      imgSprite = new PIXI.Sprite.from(colorUrl);
      imgSprite.width = width;
      imgSprite.height = height;
      app.stage.addChild(imgSprite);

      depthMapSprite = new PIXI.Sprite.from(depthURL);
      app.stage.addChild(depthMapSprite);

      displacementFilter = new PIXI.filters.DisplacementFilter(depthMapSprite);
      app.stage.filters = [displacementFilter];
      app.stage.width = width * 0.5;
      app.stage.height = height * 0.5;

  }


document.addEventListener('mousemove', function (e) {
    if(displacementFilter){
        let parameter=document.getElementById("threshold").value;
        displacementFilter.scale.x = (width / 2 - e.clientX) / parameter;
        displacementFilter.scale.y = (height / 2 - e.clientY) / parameter;
    }

})

