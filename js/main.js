class buJu{
    same(){
        var imgMinHeight,
            ulHeight,
            regexp;
        regexp = /\d+/g;    
        imgHeight = [];
        ulHeight = getComputedStyle(ul,null).width;
        ul.style.height = ulHeight;
        imgArray.forEach(function(e){
            imgHeight.push(e.height);
        })
        var imgHeight;
        imgMinHeight = Math.min(...imgHeight,window.innerHeight);
        nav.style.height = imgMinHeight + 'px';
        ul.style.top = (imgMinHeight - regexp.exec(ulHeight))/2 + 'px';
    }
    liPosition(ele){
        var ulHeight,
            liCBHeight,
            ulTop,
            dd,
            ulFirstEle;
        ulFirstEle = Number(getComputedStyle(ele[0].children[0],null).width.replace('px',''));
        ulFirstEle = ulFirstEle * .5;
        dd = 120;
        ulHeight = Number(ul.style.height.replace('px',''));
        liCBHeight = Number(getComputedStyle(ele[0].children[0],null).width.replace('px',''));
        ulTop = ulHeight / 2;
        ele.forEach(function(e){
            e.style.transformOrigin = '50% '+ ulTop + 'px';
            e.style.transform = 'rotate(' + dd + 'deg) scale(0.65,0.65)';
            e.children[0].style.transform = 'rotate(' + (-dd-5) +'deg)';
            e.children[1].style.transformOrigin = ulFirstEle + 'px 50%';
            e.children[1].style.transform = 'rotate(' +(-dd -5) + 'deg)';
            dd += 40;
        })
    }
}
class gongNeng{
    constructor(){

    }
    getDeg(e,i){
        var deg,
            reg;
        deg = [];
        reg = /-*\d+/g;
        e.forEach(function(a){
            var ll;
            ll = a.children[i].style.transform;
            deg.push(ll.match(reg))
        })
        return deg;
    }
    setTransform(e,v){
        e.style.setProperty('transform','rotate(' + v + 'deg)');
    }
}
class AnnularNav extends gongNeng{
    constructor(){
        super();
    }
    Effects(e,ele){
        var oo,
            i;
            oo = false;
            i = 0;
        li.forEach(function(ele){
            var ll;
            ll = ele.children[0];
            if(ll === e){
                for(let y = 0;y<imgArray.length;y++){
                    if(y !== i){
                        setTimeout(function(){
                            imgArray[y].classList.remove('imgAdd');
                        },350);
                        li[y].children[0].classList.remove('addBox');
                        li[y].children[1].classList.remove('addText');
                    }
                }
                imgArray[i].classList.add('imgAdd');
                setTimeout(function(){
                    li[i].children[0].classList.add('addBox');
                    li[i].children[1].classList.add('addText');
                },350);
                oo = !oo;
            }
            if(oo){
                return;
            }
            i++;
        })
    }
    rotateNav(ele){
        var i,
            y,
            angle,
            BoxDeg,
            H1DegSum,
            BoxDegSum,
            Deg;
        i = 0;
        y = 0;
        angle = 40;
        BoxDeg = this.getDeg(li,0);
        li.forEach(function(e){
            var ll;
                ll = e.children[0];
            if(ll === ele){
                y = i;
            }
            i++;
        }) 
        if(y === (initIndex+1 === imgArray.length?0:initIndex+1)){
            Deg = Number(initDegH1[y]);
            angle = initAngle - angle;
            H1DegSum = Deg - angle + 5;
            initAngle = angle;
            initIndex = y;
            this.setTransform(ul,angle);
            this.setTransform(li[y].children[1],H1DegSum);
            for(let k = 0;k<BoxDeg.length;k++){
                BoxDegSum = Number(BoxDeg[k]);
                BoxDegSum += 40;
                this.setTransform(li[k].children[0],BoxDegSum);
            }
            this.Effects(ele);
        }
        if(y === (initIndex+2 === imgArray.length+1?1:initIndex+2) || y === (initIndex + 2 === imgArray.length?0:initIndex+2)){
                Deg = initDegH1[y];
                angle = initAngle - angle*2;
                H1DegSum = Deg - angle + 5;
                initAngle = angle;
                initIndex = y;
                this.setTransform(ul,angle);
                this.setTransform(li[y].children[1],H1DegSum);
                for(let k = 0;k<BoxDeg.length;k++){
                    BoxDegSum = Number(BoxDeg[k]);
                    BoxDegSum += 80;
                    this.setTransform(li[k].children[0],BoxDegSum);
                }
                this.Effects(ele);
        }
        if(y === (initIndex-1 === -1?imgArray.length - 1:initIndex-1)){
            Deg = initDegH1[y];
            angle = initAngle + angle;
            H1DegSum = Deg - angle + 5;
            initAngle = angle;
            initIndex = y;
            this.setTransform(ul,angle);
            this.setTransform(li[y].children[1],H1DegSum);
            for(let k = 0;k<BoxDeg.length;k++){
                BoxDegSum = Number(BoxDeg[k]);
                BoxDegSum -= 40;
                this.setTransform(li[k].children[0],BoxDegSum);
            }
            this.Effects(ele);
        }
        if(y === (initIndex-2 === -2?imgArray.length - 2:initIndex-2) || y ===(initIndex - 2 === -1?imgArray.length - 1:initIndex - 2)){
            Deg = initDegH1[y];
            angle = initAngle + angle*2;
            H1DegSum = Deg - angle + 5;
            initAngle = angle;
            initIndex = y;
            this.setTransform(ul,angle);
            this.setTransform(li[y].children[1],H1DegSum);
            for(let k = 0;k<BoxDeg.length;k++){
                BoxDegSum = Number(BoxDeg[k]);
                BoxDegSum -= 80;
                this.setTransform(li[k].children[0],BoxDegSum);
            }
            this.Effects(ele);
        }
    }
}

var nav,
    imgArray,
    layout,
    li,
    ul,
    ringNav,
    initAngle,
    initIndex,
    initDegH1,
    initDegBox,
    gN;
initIndex = 0;
initDegH1 = [];
initDegBox = [];
nav = document.querySelector('.navagation');
li = document.querySelectorAll('.huanNav li');
ul = document.querySelector('.navagation .huanNav');
imgArray = document.querySelectorAll('.imgBox img');
initAngle = 5;
layout = new buJu();
ringNav = new AnnularNav();
gN = new gongNeng();
layout.same();
layout.liPosition(li);
initDegH1 = gN.getDeg(li,1);
ul.addEventListener('click',function(e){
    if(e.target.tagName === 'DIV'){
        var eleClick;
        eleClick = e.target;
        ringNav.rotateNav(eleClick);
    };
},false)


