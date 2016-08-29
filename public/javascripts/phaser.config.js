var game = new Phaser.Game(1000,1000,Phaser.AUTO, 'phaser_canvas', { preload: preload, create: create, update: update }, true);

function preload() {

//    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/mydude.png', 40, 55);

  
}

var player;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // The player and its settings
    player = game.add.sprite(game.world.width/2, game.world.height/2, 'dude');
    console.log(game.world.height);
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.

    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2], 10, true);
    player.animations.add('right', [4, 5, 6], 10, true);
    player.animations.add('up', [7, 8, 9], 10, true);
    player.animations.add('down', [10, 3, 11], 10, true);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

var latOrig = 40.5022600;
var lngOrig = -74.4509270;
var idleStance="down";
function update() {

//  Note for developer : lng = left && right ---- lat == up down


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;


    if(cursors.up.isDown && cursors.left.isDown){
        //  Up key && left key
        player.animations.play('left');
        map.panTo(new google.maps.LatLng({lat: latOrig + 0.000006, lng: lngOrig - 0.00001}));
        latOrig = latOrig + 0.000006;
        lngOrig = lngOrig - 0.00001;
        idleStance = "left";
    }else if(cursors.up.isDown && cursors.right.isDown){
        //  Up key && right key
        player.animations.play('right');
        map.panTo(new google.maps.LatLng({lat: latOrig + 0.000006, lng: lngOrig + 0.00001}));
        latOrig = latOrig + 0.000006;
        lngOrig = lngOrig + 0.00001;
        idleStance = "right";
    }else if(cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown){
        //  Up key only
        map.panTo(new google.maps.LatLng({lat: latOrig + 0.000006, lng: lngOrig}));
        latOrig = latOrig + 0.000006;
        player.animations.play('up');
        idleStance = "up";
    }else if(cursors.down.isDown && cursors.left.isDown){
        //  Down key && left key
        player.animations.play('left');
        map.panTo(new google.maps.LatLng({lat: latOrig - 0.000006, lng: lngOrig - 0.00001}));
        latOrig = latOrig - 0.000006;
        lngOrig = lngOrig - 0.00001;
        idleStance = "left";
    }else if(cursors.down.isDown && cursors.right.isDown){
        // Down key && right key
        player.animations.play('right');
        map.panTo(new google.maps.LatLng({lat: latOrig + 0.000006, lng: lngOrig + 0.00001}));
        latOrig = latOrig - 0.000006;
        lngOrig = lngOrig + 0.00001;
        idleStance = "right";
    }else if( cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown){
        //  Down key only!
        player.animations.play('down');
        map.panTo(new google.maps.LatLng({lat: latOrig - 0.000006, lng: lngOrig}));
        latOrig = latOrig - 0.000006;
        idleStance = "down";
    }else if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown){
        //  Move to the left
        player.animations.play('left');
        map.panTo(new google.maps.LatLng({lat: latOrig, lng: lngOrig - 0.00001}));
        lngOrig = lngOrig - 0.00001;
        idleStance = "left";
    }
    else if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown){
	    //  Move to the right
	    player.animations.play('right');
	    map.panTo(new google.maps.LatLng({lat: latOrig, lng: lngOrig + 0.00001}));
	  	lngOrig = lngOrig + 0.00001;
        idleStance = "right";
    }else{
      player.animations.stop();
      switch (idleStance) {
        case "left":
          player.frame = 1;
          break;
        case "right":
          player.frame = 5;
          break;
        case "down":
          player.frame = 3;
          break;
        case "up":
          player.frame = 8;
          break;
      }
    }
}


    
    //	*****************************************************	//
//	Google Api Stuff										//
//	*****************************************************	//

var map;
var mapProp;
function initialize() {
  mapProp = {
    center:new google.maps.LatLng(latOrig, lngOrig),
    zoom:19,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

}

google.maps.event.addDomListener(window, 'load', initialize);
    