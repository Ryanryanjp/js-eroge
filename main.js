//eroge-test0.pyの移植です。
//githubのテスト

enchant();

//この中で道具を用意する。
window.onload = function(){

  //中央揃えにするための関数
  /*function previewCenter(game){
    var left = ( window.innerWidth - ( game.width * game.scale )) /2;
    var top=( window.innerHeight - ( game.height * game.scale )) /2;
    $('#enchant-stage').css({
      "position":"absolute",
      "left":left+"px",
      "top":top+"px",
    });
    game._pageX = left;
    game._pageY = top;
  }
*/

  //画面サイズの設定
  game = new Core(640,480);
  //previewCenter(game);   // <-この行で中央寄せを実施

  var left = ( window.innerWidth - ( game.width * game.scale ) ) / 2;
$('#enchant-stage').css({
    "position":"absolute",
    "left":left+"px"
  });

  var top = ( window.innerHeight - ( game.height * game.scale ) ) / 2;
$('#enchant-stage').css({
    "position":"absolute",
    "top":top+"px"
  });

  game._pageX = left;
  game._pageY = top;


  game.fps = 8; //フレームレートの設定
  game.preload("sup-anime-test0.png",
               "police1.mp3",
               "Natural-Playboy.mp3",
               "se02_1.wav",
               "sen_ge_bom12.wav",
               "spanking3.wav");
  txt_i = 0 //セリフの変更変数

  //テキストの設定
  var txt = new XMLHttpRequest();
  txt.open("GET", "eroge.txt", true);
  txt.onreadystatechange = function() {
    if (txt.readyState == 4) {
      eroge_txt = txt.responseText;
      scenario = eroge_txt.split(/\r\n|\r|\n/);
      console.log(scenario[10]);
    }
  }
  txt.send(null);

  //この中にゲームのシステムを書く
  game.onload = function(){

    // [space]キーをbボタンとして割り当てる
    game.keybind(' '.charCodeAt(0), 'b');

    //入力周りの関数
    function multi_input(){

      //表示されているテキストを消す
      game.rootScene.removeChild(txt1);
      game.rootScene.removeChild(txt2);
      game.rootScene.removeChild(txt3);

      //テキスト表示変数の更新
      txt_i = txt_i + 3;

      //テキスト表示の更新
      txt1 = new Label(scenario[txt_i]);
      txt1.moveTo(20,380);
      txt1.color = 'white';
      txt1.font = "20px rounded-mplus-1p-medium";
      txt1.width = 600; //勝手に改行されないようにwidthを設定する
      game.rootScene.addChild(txt1);

      txt2 = new Label(scenario[txt_i + 1]);
      txt2.moveTo(20,410);
      txt2.color = 'white';
      txt2.font = "20px rounded-mplus-1p-medium";
      txt2.width = 600; //勝手に改行されないようにwidthを設定する
      game.rootScene.addChild(txt2);

      txt3 = new Label(scenario[txt_i + 2]);
      txt3.moveTo(20,440);
      txt3.color = 'white';
      txt3.font = "20px rounded-mplus-1p-medium";
      txt3.width = 600; //勝手に改行されないようにwidthを設定する
      game.rootScene.addChild(txt3);

      //クリック音の再生
      var sound = game.assets['se02_1.wav'].clone();
      sound.play();

      //射精音
      if(txt_i == 9){
        var sound = game.assets['sen_ge_bom12.wav'].clone();
        sound.play();
      }

      //エンディング用BGM
      if(txt_i == 12){
        //今まで再生していたBGMを停止
        game.assets['police1.mp3'].stop();

        //音楽再生
        game.assets['Natural-Playboy.mp3'].play();
        game.assets['Natural-Playboy.mp3'].loop = true;

        //変数を13にしてこれ以上動かないようにする。
        txt_i++;
      }
    }

    //音楽再生
    game.assets['police1.mp3'].play();
    game.assets['police1.mp3'].loop = true;

    // メッセージウィンドウの準備
    var sprite  = new Sprite(640,480);
	  var surface = new Surface(640,480);	// サーフェス生成

    //エンディング用サーフェス
    end_i  = new Sprite(640,480);
    end = new Surface(640,480);	// サーフェス生成

    //メッセージウィンドウの設定
    surface.context.fillStyle = "black";
    surface.context.fillRect(20,375,600,100);

    //エンディングの黒幕設定
    end.context.fillStyle = 'rgba(0,0,0,1.0)';
    end.context.fillRect(0,0,640,480);

    //fuckアニメーションの用意
    fuck = new Sprite(640,480);
    fuck.image = game.assets["sup-anime-test0.png"];
    fuck.x = 0;
    fuck.y = 0;
    fuck.frame = 0;

    //fuckアニメーションの表示
    game.rootScene.addChild(fuck);

    //メッセージウィンドウの表示
    sprite.image = surface;	// サーフェスを画像としてセット
    game.rootScene.addChild(sprite);	// シーンに追加

    //エンディングの黒幕表示
    end_i.image = end;	// サーフェスを画像としてセット
    game.rootScene.addChild(end_i);	// シーンに追加

    end_i.opacity = 0.0;


    //テキストを表示
    //長文になるとなぜか勝手に改行してしまう理由を調べる2016-12-27
    //->widthを広めに設定すると勝手に改行されなくなりました。2016-12-30
    txt1 = new Label(scenario[txt_i]);
    txt1.moveTo(20,380);
    txt1.color = 'white';
    txt1.font = "20px rounded-mplus-1p-medium";
    txt1.width = 600; //勝手に改行されないようにwidthを設定する
    game.rootScene.addChild(txt1);

    txt2 = new Label(scenario[txt_i + 1]);
    txt2.moveTo(20,410);
    txt2.color = 'white';
    txt2.font = "20px rounded-mplus-1p-medium";
    txt2.width = 600; //勝手に改行されないようにwidthを設定する
    game.rootScene.addChild(txt2);

    txt3 = new Label(scenario[txt_i + 2]);
    txt3.moveTo(20,440);
    txt3.color = 'white';
    txt3.font = "20px rounded-mplus-1p-medium";
    txt3.width = 600; //勝手に改行されないようにwidthを設定する
    game.rootScene.addChild(txt3);

    //キーボード入力の設定
    game.rootScene.addEventListener('enterframe', function(){
      if(game.input.b && txt_i <= 11){multi_input();}
    });

    //マウス入力の設定
    game.rootScene.addEventListener('touchstart', function(){
      if(txt_i <= 11){multi_input();}
    });

    //fuckアニメーションの制御
    fuck.addEventListener("enterframe", function(){

      //腰を打ち付ける音の制御
      if(this.frame == 0 && txt_i < 9){
        var sound = game.assets['spanking3.wav'].clone();
        sound.play();
      }

      // 徐々に透過する
      if(txt_i >= 11){end_i.opacity += 0.02;}

      //射精後のアニメーション制御
      if(txt_i >= 9){
        if(this.frame != 2){this.frame = 1;}
        else{this.frame = 0;}
      }

      //射精前のアニメーション制御
      if(this.frame == 2){this.frame = 0;}
      else{this.frame += 1;}

    });
  };
  game.start();
};
