interface hssan{
    draw():void;
}
class gholi implements hssan {
    public draw(){
        console.log('hello world type script');
    }
}

let ali=new gholi();
ali.draw();