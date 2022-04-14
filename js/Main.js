

$(document).ready(function() {
    tick={};
    GetAgaintTickets()

    var id_pr = document.getElementById('btnradio1');
    var id_sp = document.getElementById('btnradio2');
    var id_all = document.getElementById('all');
    var id_ns = document.getElementById('no');
    var id_oneS = document.getElementById('one');
    var id_twoS = document.getElementById('two');
    var id_threeS = document.getElementById('three');

    id_pr.addEventListener('change',function(){//сортировка по цене кнопка

        GetAgaintTickets();

        if(this.checked == true){
            GetAgaintTickets()
        }

    });
    id_all.addEventListener('change',function(){//сортировка по цене кнопка
        GetAgaintTickets();
        if(this.checked == true){
            id_ns.checked=false;
            id_oneS.checked=false;
            id_twoS.checked=false;
            id_threeS.checked=false;

        }
        else{
            id_ns.checked=true;
            id_oneS.checked=true;
            id_twoS.checked=true;
            id_threeS.checked=true;
        }

    });
    id_sp.addEventListener('change',function(){//сортировка по скорости кнопка
        GetAgaintTickets();
        if(this.checked == true){
            GetAgaintTickets()
        }

    });
    id_ns.addEventListener('change',function(){//сортировка по скорости кнопка
        GetAgaintTickets();
        if(this.checked == true){
            id_all.checked=false;
        }

    });
    id_oneS.addEventListener('change',function(){//сортировка по скорости кнопка
        GetAgaintTickets();
        if(this.checked == true){
            id_all.checked=false;
        }

    });
    id_twoS.addEventListener('change',function(){//сортировка по скорости кнопка
        GetAgaintTickets();
        if(this.checked == true){
            id_all.checked=false;
            }

    });
    id_threeS.addEventListener('change',function(){//сортировка по скорости кнопка
        GetAgaintTickets();
        if(this.checked == true){
            id_all.checked=false;
        }

    });





function SelectionSortPrice(A)       // A - массив, который нужно
{
    // отсортировать по возрастанию.
    var n = A.length;
    for (var i = 0; i < n-1; i++)
    { var min = i;
        for (var j = i+1; j < n; j++)
        { if (A[j].price < A[min].price) min = j; }
        var t = A[min]; A[min] = A[ i ]; A[ i ] = t;
    }
    PrintResalt(A);    // На выходе сортированный по возрастанию массив A.
}


function GetAgaintTickets(){
    try {
        fetch('http://localhost:3000/tickets', {

        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                var inpres = data;

                var out =FilterbyStops(inpres);
                console.log(out)
                tick=out;
                if(id_pr.checked==true){
                    SelectionSortPrice(tick);
                }
                else{
                    SelectionSortDuration(tick);
                }


            });

    }
    catch (err) {

        console.log(err);

    }
}

function SelectionSortDuration(A)       // A - массив, который нужно
{                               // отсортировать по возрастанию.
                             // отсортировать по возрастанию.
        var n = A.length;
        for (var i = 0; i < n-1; i++)
        {
            for (var j = 0; j < n-1-i; j++)
            {
                var dsum=0
                var dsum2=0
                for(var k=0; k<A[j].segments.length; k++){
                    dsum+=A[j].segments[k].duration
                }
                for(var k=0; k<A[j+1].segments.length; k++){
                    dsum2+=A[j+1].segments[k].duration
                }

                if (dsum2 < dsum)
                {
                    var t = A[j+1]; A[j+1] = A[j]; A[j] = t;
                }
            }
        }
    PrintResalt(A);    // На выходе сортированный по возрастанию массив A.

}
function FilterbyStops(tick){
    var outresalt=new Array();
    var ind=0;
    $.each(tick,(function(index,tk) {
    var alradyadd=false
    if(id_all.checked==false){
        var af=0;
        if(id_ns.checked==true && alradyadd==false){
            if(isFiltredByStops(tk,0)){
                outresalt[ind]=(tk);
                ind++;
                alradyadd=true;
            }
        }
        else{
            af++;
        }
        if(id_oneS.checked==true&& alradyadd==false){
            if(isFiltredByStops(tk,1)){
                outresalt[ind]=(tk);
                ind++;
                alradyadd=true;
            }
        }
        else{
            af++;
        }
        if(id_twoS.checked==true&& alradyadd==false){
            if(isFiltredByStops(tk,2)){
                outresalt[ind]=(tk);
                ind++;
                alradyadd=true;
            }
        }
        else{
            af++;
        }
        if(id_threeS.checked==true&& alradyadd==false){
            if(isFiltredByStops(tk,3)){
                outresalt[ind]=(tk);
                ind++;
                alradyadd=true;
            }
        }
        else{
            af++;
        }
        if(af==4){
            id_all.checked = true;
            outresalt[ind]=(tk);
            ind++;
        }
    }
    else{
        outresalt[ind]=(tk);
        ind++;
        //console.log(tk);
    }
    }))
    PrintResalt(outresalt);
    return outresalt;
}


function isFiltredByStops(tk, lemit){//-1 no limit
   if(tk.segments[0].stops.length>lemit){
        return false;
    }
    if(tk.segments[1].stops.length>lemit){
        return false;
    }
    return true;
}



function PrintResalt(tick){
    var html ='';
    console.log(tick);
    $('.tickets').empty();
    var counter = 0;
    $.each(tick,(function(index,tk) {
        counter++;
         if(counter>5)
            return false;
        html+='<div class="col-lg-4 ">';
        html+='<div class="card p-3 mb-2 bg-light">';
        html+='<div class="d-flex justify-content-between"> ';
        html+='<div class="d-flex flex-row align-items-center">';
        html+=' <div class="icon"> <img src=" http://pics.avs.io/99/36/'+tk.carrier +'.png" alt="tk.carrier"> </div>';
        html+='<div class="ms-2 c-details">';
        html+='<h6 class="mb-0 text-primary">'+tk.price+" рублей"+'</h6> ';
        html+='</div>';
        html+='</div>';
        html+='</div>';
        html+='<div class="mt-5">';

        html+='<div class="container">';
        html+=' <div class="row text-secondary">';
        html+=' <div class="col-md-4 ">';
        html+='<p class="font-weight-light">'+ tk.segments[0].origin+'-'+tk.segments[0].destination+'</p>';
        html+='</div>';
        html+='<div class="col-md-3 ">';
        html+='<p class="font-weight-light">В пути</p>';
        html+='</div>';
        html+='<div class="col-md-5 ">';
        html+='<p class="font-weight-light">'+ tk.segments[0].stops.length+' пересадки(а)'+'</p>';
        html+='</div>';
        html+='</div>';
        html+=' <div class="row">';
        html+='<div class="col-md-4">';
        var stdate1=new Date(tk.segments[0].date);
        var sh=stdate1.getHours();
        var fh=Math.floor(tk.segments[0].duration/60);//время полета целое число часов
        var fm=tk.segments[0].duration-fh*60;//минуты
        //console.log(findate1.getHours());
        //findate1 = findate1.setMinutes(stdate1.getMinutes()+fm);
        var min1=   stdate1.getMinutes();
        console.log(sh+' '+fh)
        var flh=sh+fh;
        console.log(fh)
        var min2=stdate1.getMinutes()+fm;
        if(min2>60){
            flh++;
            min2=min2-60;
        }
        if(flh>24)

            flh=flh-24;
            console.log(flh)
        if(min1<10)
            min1='0'+min1
        if(min2<10)
            min2='0'+min2

        html+='<p class="font-weight-bold">'+sh+':'+min1+'-'+flh+':'+min2+'</p>';
        html+='</div>';
        html+='<div class="col-md-3 ">';
        html+='<p class="font-weight-bold">'+fh+'ч '+fm+'м'+'</p>';
        html+='</div>';
        html+='<div class="col-md-5 ">';
        var stopsl="";
        for(var k=0; k<tk.segments[0].stops.length; k++){
            if(k<tk.segments[0].stops.length-1)
                stopsl+=tk.segments[0].stops[k]+',';
            else
                stopsl+=tk.segments[0].stops[k];
        }
        html+='<p class="font-weight-bold">'+stopsl+'</p>';
        html+='</div>';
        html+='</div>';//конец туда

        html+=' <div class="row text-secondary">';
        html+=' <div class="col">';
        html+='<p class="font-weight-light">'+ tk.segments[1].origin+'-'+tk.segments[1].destination+'</p>';
        html+='</div>';
        html+='<div class="col-md-3">';
        html+='<p class="font-weight-light">В пути</p>';
        html+='</div>';
        html+='<div class="col-md-5 ">';

        html+='<p class="font-weight-light">'+ tk.segments[1].stops.length+' пересадки(а)'+'</p>';
        html+='</div>';
        html+='</div>';
        html+=' <div class="row">';
        html+='<div class="col">';
        var stdate1=new Date(tk.segments[1].date);
        var sh=stdate1.getHours();

        var fh=Math.floor(tk.segments[1].duration/60);//время полета целое число часов
        var fm=tk.segments[1].duration-fh*60;//минуты
        //console.log(findate1.getHours());
        //findate1 = findate1.setMinutes(stdate1.getMinutes()+fm);
        var min1=   stdate1.getMinutes();
        var flh=sh+fh;

        var min2=stdate1.getMinutes()+fm;
        if(min2>60){
            flh++;
            min2=min2-60;
        }
        if(flh>24)

            flh=flh-24;
        if(min1<10)
            min1='0'+min1
        if(min2<10)
            min2='0'+min2

        html+='<p class="font-weight-bold">'+sh+':'+min1+'-'+flh+':'+min2+'</p>';
        html+='</div>';
        html+='<div class="col-md-3 ">';
        html+='<p class="font-weight-bold">'+fh+'ч '+fm+'м'+'</p>';
        html+='</div>';
        html+='<div class="col-md-5">';
        var stopsl="";
        for(var k=0; k<tk.segments[1].stops.length; k++){
            if(k<tk.segments[1].stops.length-1)
                stopsl+=tk.segments[1].stops[k]+',';
            else
                stopsl+=tk.segments[1].stops[k];
        }
        html+='<p class="font-weight-bold">'+stopsl+'</p>';
        html+='</div>';
        html+='</div>';//конец обратно

        html+='</div>';
        html+='</div>';
        html+='</div>';
        html+='</div>';
     }))

    $('.tickets').append(html);

 }
});


