$(document).ready(function(){
  //////////////////////////////////////////////////////
  ///Current index of video
  //////////////////////////////////////////////////////
  var main_vid_cur = 0;
  //////////////////////////////////////////////////////
  ///First load functions
  //////////////////////////////////////////////////////
  //announcementMsg();
  welcomeMsg();
  generalSettings();
  themeSet();

  //////////////////////////////////////////////////////
  ///Check url for queries
  //////////////////////////////////////////////////////
  if(window.location.href.indexOf('?') > 0){
    decodeURI();
  }else{
    $('.main_vid').attr('src', `${videos.data[main_vid_cur].src}`);
    $('.text_desc').html(`${videos.data[main_vid_cur].description}`);
    encodeURI();
  }

  //////////////////////////////////////////////////////
  ///event listener for previous button clicks.
  //////////////////////////////////////////////////////
  $('.prev_vid').click(function(){
      if(main_vid_cur - 1 < 0){
        main_vid_cur = videos.data.length - 1;
      }else{
        main_vid_cur -= 1;
      }
      $('.main_vid').attr('src', `${videos.data[main_vid_cur].src}`);
      $('.text_desc').html(`${videos.data[main_vid_cur].description}`);
      encodeURI();
  });

  //////////////////////////////////////////////////////
  ///event listener for nex button clicks
  //////////////////////////////////////////////////////
  $('.next_vid').click(function(){
      if(main_vid_cur + 1 > videos.data.length - 1){
        main_vid_cur = 0;
      }else{
        main_vid_cur += 1;
      }
      $('.main_vid').attr('src', `${videos.data[main_vid_cur].src}`);
      $('.text_desc').html(`${videos.data[main_vid_cur].description}`);
      encodeURI();
  });

  //////////////////////////////////////////////////////
  ///event listener for shuffle button click
  //////////////////////////////////////////////////////
  $('.shuffle_list').click(function(){
    shuffle(videos.data);
    Materialize.toast('Videos Shuffled', 3000, 'rounded')
  })

  //////////////////////////////////////////////////////
  ///event listener for loop button click
  //////////////////////////////////////////////////////
  $('.loop_list').click(function(){
    if($('.main_vid').prop('loop') == false){
      Materialize.toast('Loop Enabled', 3000, 'rounded')
      $('.main_vid').prop('loop', true);
    }else if($('.main_vid').prop('loop') == true){
      Materialize.toast('Loop Disabled', 3000, 'rounded')
      $('.main_vid').prop('loop', false);
    }
  })

  //////////////////////////////////////////////////////
  ///event listener waiting for video prop on end to trigger auto play
  //////////////////////////////////////////////////////
  $('.main_vid').on('ended', function(){
    main_vid_cur += 1;
    $('.main_vid').attr('src', `${videos.data[main_vid_cur].src}`);
    if(videos.data[main_vid_cur].description != null){
      $('.text_desc').html(`${videos.data[main_vid_cur].description}`);
    }
    $('.main_vid').attr('autoplay', true);
    encodeURI();
  });

  //////////////////////////////////////////////////////
  ///NOT OPPERATING option for click events on the title for videos
  //////////////////////////////////////////////////////
  $('.text_desc').click(function(){
  });

  //////////////////////////////////////////////////////
  ///function using method encodeURIComponent takes video src and encodes it
  //////////////////////////////////////////////////////
  function encodeURI(){
    var url = window.location.href;
    var src = encodeURIComponent(`${videos.data[main_vid_cur].src}`);
    history.pushState('', '', `?${src}`);
  }

  //////////////////////////////////////////////////////
  ///function using method decodeURIComponent takes query and looks for a match ///in videos.data if there is then we change video src to the query.
  //////////////////////////////////////////////////////
  function decodeURI(){
    var url = window.location.href;
    var res = url.split('?')[1];
    var decRes = decodeURIComponent(res)
    $('.main_vid').attr('src', decRes);
    var selectI = $.map(videos.data, function(video, ind){
      if(video.src == decRes){
        return video;
      }
    })
      $('.text_desc').html(selectI[0].description);
  }

  //////////////////////////////////////////////////////
  ///function that checks users first visit if true then we will display a ///warning message
  //////////////////////////////////////////////////////
  function welcomeMsg(){
    if(localStorage.getItem('agree') == null){
      localStorage.setItem('agree', 'true');
      $('.container-fluid').append('<div>');
      $('.modal').modal();
      $('#welcome').modal('open');
    }
  }

  //////////////////////////////////////////////////////
  ///function that sets up general settings for users.
  //////////////////////////////////////////////////////
  function generalSettings(){
    if(localStorage.getItem('volume') == null){
      localStorage.setItem('volume', '1.0');
    }
    $('.main_vid').prop('volume', localStorage.getItem('volume'));
  }

  //////////////////////////////////////////////////////
  ///function that sets user up with dark theme and handles changes to themes.
  //////////////////////////////////////////////////////
  function themeSet(){
    if(localStorage.getItem('theme') == null){
      localStorage.setItem('theme', 'dark');
    }
    if(localStorage.getItem('theme') == 'light') {
      $('.bannerImg').fadeIn('slow', function(){
          $('.bannerImg').attr('src', 'Files/lightBanner.png');
      })
      $('.menu').removeClass('black darken-3');
      $('.menu').addClass('grey lighten-5');
      $('.btn').removeClass('black darken-3');
      $('.btn').addClass('grey lighten-5');
      $('.menu a').css('color', 'black');
      $('.btn').css('color', 'black');
      $('body').css('background-color', 'rgb(249,249,249)');
      $('p').css('color', 'black');
      $('ul').css('color', 'black');
    }
    if(localStorage.getItem('theme') == 'dark'){
      $('.bannerImg').fadeIn('slow', function(){
          $('.bannerImg').attr('src', 'Files/darkBanner.png');
      })
      $('.menu').removeClass('grey lighten-5');
      $('.menu').addClass('black darken-3');
      $('.btn').removeClass('grey lighten-5');
      $('.btn').addClass('black darken-3');
      $('.menu a').css('color', 'white');
      $('.btn').css('color', 'white');
      $('body').css('background-color', 'rgb(55,71,79)');
      $('p').css('color', 'white');
      $('ul').css('color', 'white');
    }
  }

  //////////////////////////////////////////////////////
  ///function that is called when shuffle_list is triggered, working on my own
  /// as this was a solution on stackoverflow.
  //////////////////////////////////////////////////////
  function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
    return array;
}

  //////////////////////////////////////////////////////
  ///function that will be used for displaying announcement modals.
  //////////////////////////////////////////////////////
  function announcementMsg(){
    if(localStorage.getItem('update1') == null){
      localStorage.setItem('update1', 'true');
      $('.container-fluid').append('<div>');
      $('.modal').modal();
      $('#announcement_1').modal('open');
    }
  }

  //////////////////////////////////////////////////////
  ///Function that will handle bounds for curr_vid index so it does not
  ///go over or under
  //////////////////////////////////////////////////////
  function checkBounds(){
    if(main_vid_cur + 1 > videos.data.length - 1 || main_vid_cur - 1 < 0){
      return false;
    }else{
      return true;
    }
  }


$('#videos_length').html(videos.data.length);
})









//////////////////////////////////////////////////////
///Videos object
//////////////////////////////////////////////////////
var videos = {
  "data":[
{"src": "Files/engineCoon.webm", "description": "Engine Coon", "poster": ""},
{"src": "Files/holySheetDude.webm", "description": "Holy Shit Dud", "poster": ""},
{"src": "Files/solarSystem.webm", "description": "Spot On", "poster": ""},
{"src": "Files/masterTheif.webm", "description": "Master Theif", "poster": ""},
{"src": "Files/justLikeAGame.webm", "description": "Just Like A Game", "poster": ""},
{"src": "Files/drinkMyOwnUrine.webm", "description": "Drink My Own Urine", "poster": ""},
{"src": "Files/safeDefense.webm", "description": "Safe Defense", "poster": ""},
{"src": "Files/ohGodAnime.webm", "description": "Oh Jesus", "poster": ""},
{"src": "Files/americanHouse.webm", "description": "American Households", "poster": ""},
{"src": "Files/justDoIt.webm", "description": "Do It", "poster": ""},
{"src": "Files/watchTheLight.webm", "description": "God Damnit Kevin", "poster": ""},
{"src": "Files/pipeHitten.webm", "description": "Pipe Hitten", "poster": ""},
{"src": "Files/dogeIsBroken.webm", "description": "Broken Doge", "poster": ""},
{"src": "Files/arabianNights.webm", "description": "Arabian Nights", "poster": ""},
{"src": "Files/iAmAGrenade.webm", "description": "Ur a What?", "poster": ""},
{"src": "Files/fuckingGoofy.webm", "description": "Fucking Goofy", "poster": ""},
{"src": "Files/talentedArtist.webm", "description": "Talent", "poster": ""},
{"src": "Files/emergencySurgery.webm", "description": "Emergency Surgeries", "poster": ""},
{"src": "Files/bigFan.webm", "description": "Technique", "poster": ""},
{"src": "Files/methane.webm", "description": "Methane", "poster": ""},
{"src": "Files/trumpAnime.webm", "description": "Make Anime Great Again", "poster": ""},
{"src": "Files/gandalfIsCold.webm", "description": "Little Chilly", "poster": ""},
{"src": "Files/pickItUP.webm", "description": "Bag Was Too Small", "poster": ""},
{"src": "Files/manBaby.webm", "description": "Man Baby", "poster": ""},
{"src": "Files/extraFoodStamps.webm", "description": "Payday", "poster": ""},
{"src": "Files/adl.webm", "description": "ADL", "poster": ""},
{"src": "Files/whatAreYouRetardedAsexual.webm", "description": "Are You a Retard", "poster": ""},
{"src": "Files/thatsNicewewe.webm", "description": "That's Nice", "poster": ""},
{"src": "Files/elsaJapanese.webm", "description": "Live Action Frozen", "poster": ""},
{"src": "Files/whatIsGoinOn.webm", "description": "Wat", "poster": ""},
{"src": "Files/nonBeleiver.webm", "description": "Non Beleiver", "poster": ""},
{"src": "Files/heCanFly.webm", "description": "He Can Fly", "poster": ""},
{"src": "Files/drStrangeDudu.webm", "description": "Dr Strange", "poster": ""},
{"src": "Files/oldManDaDaa.webm", "description": "Old Man Darude", "poster": ""},
{"src": "Files/blackIce.webm", "description": "Too Stupid To Call", "poster": ""},
{"src": "Files/apache.webm", "description": "Apache", "poster": ""},
{"src": "Files/dududuHeadSmash.webm", "description": "Head Smash DuDu", "poster": ""},
{"src": "Files/whaleWars.webm", "description": "Whale Wars", "poster": ""},
{"src": "Files/littleRunt.webm", "description": "For The Queen", "poster": ""},
{"src": "Files/trollParade.webm", "description": "Parade", "poster": ""},
{"src": "Files/itsScience.webm", "description": "Its Science", "poster": ""},
{"src": "Files/spurdoRip.webm", "description": "Spurdo Rip", "poster": ""},
{"src": "Files/evolutionOfBF.webm", "description": "Evolution Of BF Themes", "poster": ""},
{"src": "Files/rarePepes.webm", "description": "Rare Pepes", "poster": ""},
{"src": "Files/africanMatingCall.webm", "description": "African Mating Call", "poster": ""},
{"src": "Files/aLittleFlat.webm", "description": "Technique", "poster": ""},
{"src": "Files/sayYourPrayers.webm", "description": "Say Your Prayers", "poster": ""},
{"src": "Files/Almost.webm", "description": "Interstellar", "poster": ""},
{"src": "Files/sickTalent.webm", "description": "Talent", "poster": ""},
{"src": "Files/FBI.webm", "description": "FBI", "poster": ""},
{"src": "Files/Berlin.webm", "description": "Berlin", "poster": ""},
{"src": "Files/bf1Realism.webm", "description": "BF1 Realism", "poster": ""},
{"src": "Files/darnFriedRice.webm", "description": "Dry Rice", "poster": ""},
{"src": "Files/whereToFindSalt.webm", "description": "Pass The Salt", "poster": ""},
{"src": "Files/maniaac.webm", "description": "Maniac", "poster": ""},
{"src": "Files/bottleFlip.webm", "description": "Bottle Flip", "poster": ""},
{"src": "Files/reichOrRike.webm", "description": "Reich or Rike", "poster": ""},
{"src": "Files/reallyAsshole.webm", "description": "Really?", "poster": ""},
{"src": "Files/futureOfGAming.webm", "description": "Future Of Gaming", "poster": ""},
{"src": "Files/ridinDirty.webm", "description": "/B/ Me", "poster": ""},
{"src": "Files/2NukesNotEnough.webm", "description": "Wasn't Enough", "poster": ""},
{"src": "Files/homosapien.webm", "description": "Homo Sapiens", "poster": ""},
{"src": "Files/sakuraKon.webm", "description": "SakuraKon", "poster": ""},
{"src": "Files/overwatchSuperman.mp4", "description": "Overwatch Superman", "poster": ""},
{"src": "Files/reeeekt.mp4", "description": "Reeekt", "poster": ""},
{"src": "Files/timeToFeedTheTurtles.webm", "description": "Time To Feed The Turtles", "poster": ""},
{"src": "Files/likeOhImGayy.webm", "description": "Like Oh I'm Gay", "poster": ""},
{"src": "Files/backBackBackkk.webm", "description": "Back Back Backk", "poster": ""},
{"src": "Files/holyMolyIndeed.webm", "description": "Holy Moly Indeed", "poster": ""},
{"src": "Files/elevatorParty.webm", "description": "Elevator Party", "poster": ""},
{"src": "Files/somethinOnUrNose.webm", "description": "Barely Noticable Grandma", "poster": ""},
{"src": "Files/blyatToTheFuture.webm", "description": "BLYAT To The Future", "poster": ""},
{"src": "Files/barmitsva.webm", "description": "Barmitsva", "poster": ""},
{"src": "Files/destroyMeSchool.webm", "description": "Destroy Me School", "poster": ""},
{"src": "Files/octobooty.webm", "description": "Octo Booty", "poster": ""},
{"src": "Files/drTranny.webm", "description": "Transel In Distress", "poster": ""},
{"src": "Files/marbleRace.webm", "description": "Marble Race", "poster": ""},
{"src": "Files/marijuanaNotEvenOnce.webm", "description": "Marijuana Not Even Once", "poster": ""},
{"src": "Files/bestWayofContact.webm", "description": "Best Way of Contact", "poster": ""},
{"src": "Files/heyRon.webm", "description": "Hey Ron", "poster": ""},
{"src": "Files/flyWheels.webm", "description": "Fly Wheels", "poster": ""},
{"src": "Files/baconPancakes.webm", "description": "Bacon Pancakes", "poster": ""},
{"src": "Files/suprisePretzals.webm", "description": "Pretzals", "poster": ""},
{"src": "Files/pukeInACan.webm", "description": "Puke In A Can", "poster": ""},
{"src": "Files/japanCat.webm", "description": "Japanese Cat", "poster": ""},
{"src": "Files/leslieShutYourMouth.webm", "description": "Leslie Shut Your Mouth", "poster": ""},
{"src": "Files/freeRealEstate.webm", "description": "Free Real Estate", "poster": ""},
{"src": "Files/saad.webm", "description": "They Call Him Saad", "poster": ""},
{"src": "Files/juanChance.webm", "description": "2 Cool 4 Dinner", "poster": ""},
{"src": "Files/EverHadADream.webm", "description": "Dreams", "poster": ""},
{"src": "Files/dejaVuCamera.webm", "description": "Deja Vu Camera", "poster": ""},
{"src": "Files/AdamsFamily.webm", "description": "Adams Family", "poster": ""},
{"src": "Files/shesGone.webm", "description": "She's Gone", "poster": ""},
{"src": "Files/christmasRuined.webm", "description": "Xmas Is Ruined", "poster": ""},
{"src": "Files/LiveLeak.webm", "description": "LiveLeak", "poster": ""},
{"src": "Files/teamWorknMoney.webm", "description": "Team Work", "poster": ""},
{"src": "Files/andromeda.webm", "description": "Andromeda", "poster": ""},
{"src": "Files/kilogramme.webm", "description": "Kilo", "poster": ""},
{"src": "Files/duduStarWars.webm", "description": "DuDu Star Wars", "poster": ""},
{"src": "Files/notACar.webm", "description": "Not A Car", "poster": ""},
{"src": "Files/iAckYou.webm", "description": "I Ack You", "poster": ""},
{"src": "Files/wouldntItBenice2.webm", "description": "Wouldn't It Be Nice", "poster": ""},
{"src": "Files/canKnot.webm", "description": "Can Knot", "poster": ""},
{"src": "Files/powerOfGod.webm", "description": "Power Of God", "poster": ""},
{"src": "Files/mtvCribs.webm", "description": "MTV Cribs", "poster": ""},
{"src": "Files/killTheWho.webm", "description": "K for Kill", "poster": ""},
{"src": "Files/pekaboo.webm", "description": "Peekaboom", "poster": ""},
{"src": "Files/yeboiii.webm", "description": "Ye Boi", "poster": ""},
{"src": "Files/imYoBrotha.webm", "description": "Stop it guys", "poster": ""},
{"src": "Files/killJester.webm", "description": "The Jester", "poster": ""},
{"src": "Files/scaredDog1.webm", "description": "Scared Dog", "poster": ""},
{"src": "Files/whatMoneyCanBuyJaps.webm", "description": "Streaming Japs", "poster": ""},
{"src": "Files/aznRocketScience.webm", "description": "Asian Rocket Science", "poster": ""},
{"src": "Files/navySeals.webm", "description": "Navy Seals", "poster": ""},
{"src": "Files/ohoh.webm", "description": "Oh Oh", "poster": ""},
{"src": "Files/assHoleFish.webm", "description": "Asshole Fish", "poster": ""},
{"src": "Files/probablyDrunk2.webm", "description": "Rough Day", "poster": ""},
{"src": "Files/heyFuckerrr.webm", "description": "Hey Fucker", "poster": ""},
{"src": "Files/upIntoTheAsshole.webm", "description": "Pain in The Ass", "poster": ""},
{"src": "Files/alexaStahp.webm", "description": "Alexa Stahp", "poster": ""},
{"src": "Files/eatThatMuffin.webm", "description": "Muffin", "poster": ""},
{"src": "Files/dreamCollapsing.webm", "description": "Choo Choo", "poster": ""},
{"src": "Files/candyShop.webm", "description": "Candy Shop", "poster": ""},
{"src": "Files/chattyPatty.webm", "description": "Chatty Patty", "poster": ""},
{"src": "Files/heroOfRome.webm", "description": "Hero Of Rome", "poster": ""},
{"src": "Files/paperPlaneAndDoritos.webm", "description": "Paper Airplane and Doritos", "poster": ""},
{"src": "Files/heIsDead.webm", "description": "He is Dead", "poster": ""},
{"src": "Files/Time.webm", "description": "Time", "poster": ""},
{"src": "Files/grabblers.webm", "description": "Grabblers", "poster": ""},
{"src": "Files/Rolaids.webm", "description": "Rolaids", "poster": ""},
{"src": "Files/arfWars.webm", "description": "Arf Fighters", "poster": ""},
{"src": "Files/eminemGravity.webm", "description": "Eminem Gravity", "poster": ""},
{"src": "Files/codNewCouch.webm", "description": "COD New Couch", "poster": ""},
{"src": "Files/narutoo.webm", "description": "Naruto", "poster": ""},
{"src": "Files/poorDovaKing.webm", "description": "Dova King", "poster": ""},
{"src": "Files/naziBird.webm", "description": "Nazi Bird", "poster": ""},
{"src": "Files/japaneseRacing.webm", "description": "Japanese Racing", "poster": ""},
{"src": "Files/CodSuckers.webm", "description": "It Ain't Gay", "poster": ""},
{"src": "Files/initialH.webm", "description": "Initial H", "poster": ""},
{"src": "Files/firstKiss.webm", "description": "First Kiss", "poster": ""},
{"src": "Files/aWeightLimit.webm", "description": "Weight Limit", "poster": ""},
{"src": "Files/hetaiToo.webm", "description": "Samuel Jackson", "poster": ""},
{"src": "Files/wakeUPAsshole.webm", "description": "Wake Up", "poster": ""},
{"src": "Files/littlePTSD.webm", "description": "PTSD", "poster": ""},
{"src": "Files/hairyBalls.webm", "description": "Hairy Balls", "poster": ""},
{"src": "Files/duduJump.webm", "description": "Man Whale", "poster": ""},
{"src": "Files/changingTheGame.webm", "description": "This is Battlefield, changing the game", "poster": ""},
{"src": "Files/slavicFaith.webm", "description": "Slavic WTF", "poster": ""},
{"src": "Files/dankerMeme.mp4", "description": "A Shade Danker", "poster": ""},
{"src": "Files/yaHearThis.webm", "description": "Allahu Music", "poster": ""},
{"src": "Files/itsTheFuckinNews.webm", "description": "The Fucking News", "poster": ""},
{"src": "Files/99Dancing.webm", "description": "99 Dancing", "poster": ""},
{"src": "Files/womanNailsIt.webm", "description": "Nailed it", "poster": ""},
{"src": "Files/highOnThatLife.webm", "description": "I'll Have What She Had", "poster": ""},
{"src": "Files/tahahaahha.webm", "description": "Tahahaha", "poster": ""},
{"src": "Files/insaneHops.webm", "description": "Almost an Amazing Video", "poster": ""},
{"src": "Files/torque3D.webm", "description": "VR", "poster": ""},
{"src": "Files/ygylAnimu.webm", "description": "Mother of Cringe", "poster": ""},
{"src": "Files/summBODY.webm", "description": "Wait for It", "poster": ""},
{"src": "Files/ddddported.webm", "description": "DeDePorted", "poster": ""},
{"src": "Files/itgoesItGoes.webm", "description": "It Goes!", "poster": ""},
{"src": "Files/noticeMeSenpainoticeMe.webm", "description": "Notice Me Senpai", "poster": ""},
{"src": "Files/lorGayy.webm", "description": "Heh Gayy", "poster": ""},
{"src": "Files/thisWorldIsDoomed3.webm", "description": "I Want Off This Planet", "poster": ""},
{"src": "Files/animeProtector.webm", "description": "Don't Disrespect Animu", "poster": ""},
{"src": "Files/tooSlowDudee.webm", "description": "Faster dude", "poster": ""},
{"src": "Files/ladyParker.webm", "description": "Lady Parker", "poster": ""},
{"src": "Files/appleOnHead.webm", "description": "Kick This Apple On My Head", "poster": ""},
{"src": "Files/bearCumUhh.webm", "description": "Bear Cum", "poster": ""},
{"src": "Files/bullshitNews.webm", "description": "Bullshit", "poster": ""},
{"src": "Files/pigGoGo.webm", "description": "Go Go Go", "poster": ""},
{"src": "Files/likegmasPus.webm", "description": "Grandmas Pussy", "poster": ""},
{"src": "Files/activia.webm", "description": "Activia", "poster": ""},
{"src": "Files/againstHash.webm", "description": "People Against Hash", "poster": ""},
{"src": "Files/youGotThisTravis.webm", "description": "You Got This", "poster": ""},
{"src": "Files/owPOTG.webm", "description": "Play Of The Game", "poster": ""},
{"src": "Files/chinersInH1Z1.webm", "description": "Chinese Gamers", "poster": ""},
{"src": "Files/blockinOutTheHaters.webm", "description": "Blockin Out The Haters", "poster": ""},
{"src": "Files/trumpOnTitan.webm", "description": "Build That Wall", "poster": ""},
{"src": "Files/thornga.webm", "description": "I Don't Play That Shit", "poster": ""},
{"src": "Files/ygyl2.webm", "description": "YGYL", "poster": ""},
{"src": "Files/winkySlider.webm", "description": "Winkie Slider", "poster": ""},
{"src": "Files/iSetItOnFire.webm", "description": "Who Set The Fire", "poster": ""},
{"src": "Files/andHe'sGone.webm", "description": "Heh Japanese", "poster": ""},
{"src": "Files/chickenNugger.webm", "description": "Chicken Nuggers", "poster": ""},
{"src": "Files/turnitOnNOffNOn.webm", "description": "Windows Is Shutting Down", "poster": ""},
{"src": "Files/caturday.webm", "description": "Chill Cat", "poster": ""},
{"src": "Files/blackDoInTheDoo.webm", "description": "Swoopin In For That Profit", "poster": ""},
{"src": "Files/tamponCombat.webm", "description": "Fall Back", "poster": ""},
{"src": "Files/trumpTriggeredNooo.webm", "description": "Liberal Teers", "poster": ""},
{"src": "Files/wokenAwake.webm", "description": "Woah", "poster": ""},
{"src": "Files/blackRScarrrry.webm", "description": "What To Truely Be Afraid Of", "poster": ""},
{"src": "Files/iDont.webm", "description": "Makin It Great Again", "poster": ""},
{"src": "Files/ewwwahahah.webm", "description": "Down With The Sickness", "poster": ""},
{"src": "Files/curryDK.webm", "description": "Da Da Da", "poster": ""},
{"src": "Files/hollywoodSquares.webm", "description": "Doctor in Every Family", "poster": ""},
{"src": "Files/xmasMorning.webm", "description": "Alternatives", "poster": ""},
{"src": "Files/animeJihad.webm", "description": " Your Daily Cringe", "poster": ""},
{"src": "Files/nonononoBaby.webm", "description": "Cat Singing", "poster": ""},
{"src": "Files/rustWtf.webm", "description": "Chased in Rust", "poster": ""},
{"src": "Files/almostAnAdult.webm", "description": "Action Figures", "poster": ""},
{"src": "Files/woahhhhW.webm", "description": "We Hate What!?", "poster": ""},
{"src": "Files/chickenPants.webm", "description": "Chicken in Pants", "poster": ""},
{"src": "Files/mlgDisney.webm", "description": "Every Kid on Cod", "poster": ""},
{"src": "Files/dkMan.webm", "description": "They Call Him The DK", "poster": ""},
{"src": "Files/duddududu.webm", "description": "Borkin", "poster": ""},
{"src": "Files/recruitBoris.webm", "description": "Russian Flying", "poster": ""},
{"src": "Files/neverBePresidentHa.webm", "description": "Ironic Aint It", "poster": ""},
{"src": "Files/ddrChamp.webm", "description": "DD Nation", "poster": ""},
{"src": "Files/lunchBreakMan.webm", "description": "African Schools", "poster": ""},
{"src": "Files/seagulsStopItNow.webm", "description": "Star Wars", "poster": ""},
{"src": "Files/cpu's.webm", "description": "World Of Tanks Optimization", "poster": ""},
{"src": "Files/getMeOffThisPlanet.webm", "description": "He sure can move those hips", "poster": ""},
{"src": "Files/seigHeilBoys.webm", "description": "Sieg Heil", "poster": ""},
{"src": "Files/houseDud.webm", "description": "House", "poster": ""},
{"src": "Files/urActualyGay3.webm", "description": "You are Gay", "poster": ""},
{"src": "Files/blackDocta.webm", "description": "Where Did He Get The Bike", "poster": ""},
{"src": "Files/captainWeed.webm", "description": "Captain Planet", "poster": ""},
{"src": "Files/wahhhhhh.webm", "description": "Rekt", "poster": ""},
{"src": "Files/costumeRekt.webm", "description": "Russian Mafia", "poster": ""},
{"src": "Files/noManBuyLel.webm", "description": "No Man Buy", "poster": ""},
{"src": "Files/themDukeBoys.webm", "description": "Them Duke Boys", "poster": ""},
{"src": "Files/legalyAMan.webm", "description": "Don't Assume My Gender", "poster": ""},
{"src": "Files/pvtbubbapvtgump.webm", "description": "Battle Buddies", "poster": ""},
{"src": "Files/rapVsRealty.webm", "description": "Reality Of Rap Videos", "poster": ""},
{"src": "Files/noHarry.webm", "description": "Bye Harry", "poster": ""},
{"src": "Files/ngerOlogy.webm", "description": "NiggerOlogy", "poster": ""},
{"src": "Files/whereDidYouComeFrom.webm", "description": "/B/ Joe", "poster": ""},
{"src": "Files/rodeaSurf.webm", "description": "Boss", "poster": ""},
{"src": "Files/deadSponge.webm", "description": "Hi Squidward", "poster": ""},
{"src": "Files/grabAHoldOfMe.webm", "description": "Pull me up", "poster": ""},
{"src": "Files/killYoselfDraw.webm", "description": "Vr Suicide", "poster": ""},
{"src": "Files/letMeShowYouHowItsDone.webm", "description": "Pumped up kicks", "poster": ""},
{"src": "Files/noRestForTheTriggered.webm", "description": "No Rest For The Triggered", "poster": ""},
{"src": "Files/signedMichaelBay.webm", "description": "He did what..?", "poster": ""},
{"src": "Files/trumpIsPresHa.webm", "description": "Awkward Irony", "poster": ""},
{"src": "Files/weeewooo.webm", "description": "weeewooo", "poster": ""},
{"src": "Files/wtfHooman.webm", "description": "Woked", "poster": ""},
{"src": "Files/yourThoughtsLol.webm", "description": "Your Thoughts", "poster": ""},
{"src": "Files/bearsLel.webm", "description": "Bears", "poster": ""},
{"src": "Files/watchThisDad.webm", "description": "Watch This Dad", "poster": ""},
{"src": "Files/gamesBroken.mp4", "description": "Games Broken", "poster": ""},
{"src": "Files/namesJCena.webm", "description": "Whats his Name", "poster": ""},
{"src": "Files/equalRightsAndApples.webm", "description": "Equal Rights And Apples", "poster": ""},
{"src": "Files/capchtcha.webm", "description": "capchtka", "poster": ""},
{"src": "Files/showinOffL.webm", "description": "Showin Off", "poster": ""},
{"src": "Files/knp.webm", "description": "History", "poster": ""},
{"src": "Files/ahahhaaaah.webm", "description": "Too Close", "poster": ""},
{"src": "Files/goingStreakinggg.webm", "description": "That's A Door", "poster": ""},
{"src": "Files/howTall.webm", "description": "How Tall", "poster": ""},
{"src": "Files/iNeedAMedicv.webm", "description": "Get Me the paramedics", "poster": ""},
{"src": "Files/cantSwim.webm", "description": "Can't Swim", "poster": ""},
{"src": "Files/johnCenaChopper.webm", "description": "What's his names Chopper", "poster": ""},
{"src": "Files/foundOutUrAGirl.webm", "description": "Your a girl?", "poster": ""},
{"src": "Files/feelsSoGood2BBad.webm", "description": "Feels So Good To Be Bad", "poster": ""},
{"src": "Files/iNeedYouSpidey.webm", "description": "Dirty SpiderMan", "poster": ""},
{"src": "Files/spongebobSS.webm", "description": "SpongeBob SS", "poster": ""},
{"src": "Files/Strike.webm", "description": "Wii Sports", "poster": ""},
{"src": "Files/nooooooooo.webm", "description": "Nooo!", "poster": ""},
{"src": "Files/itsMahDick01.webm", "description": "Mah Dick", "poster": ""},
{"src": "Files/thisMySht.webm", "description": "This My Shit", "poster": ""},
{"src": "Files/vroomVroom.webm", "description": "Sweet Engine", "poster": ""},
{"src": "Files/luckydoge.webm", "description": "Lucky Doge", "poster": ""},
{"src": "Files/spoopyAF.webm", "description": "Spoopy", "poster": ""},
{"src": "Files/svu.webm", "description": "SVU", "poster": ""},
{"src": "Files/upInHere.webm", "description": "Up In Here", "poster": ""},
{"src": "Files/weDontHireWomen.webm", "description": "Heh Women", "poster": ""},
{"src": "Files/ridinDurty.webm", "description": "Ridin Dirty", "poster": ""},
{"src": "Files/lookAtThisThing.webm", "description": "Look At This Thing", "poster": ""},
{"src": "Files/wakeMeUPP.webm", "description": "Wake Me Up", "poster": ""},
{"src": "Files/iThinkHeIsDeadRAH.webm", "description": "Dragon Born", "poster": ""},
{"src": "Files/appleExperience.webm", "description": "Innovation", "poster": ""},
{"src": "Files/sjwTriggered.webm", "description": "Binky's Facts", "poster": ""},
{"src": "Files/fatManNFirecrackers.webm", "description": "FireCrackers", "poster": ""},
{"src": "Files/leviousuhdud.webm", "description": "Suh Dud", "poster": ""},
{"src": "Files/electricGuitar.webm", "description": "Electric Guitar", "poster": ""},
{"src": "Files/goToSleepNN.webm", "description": "Go To Sleep", "poster": ""},
{"src": "Files/walkingOnAir.webm", "description": "News 24", "poster": ""},
{"src": "Files/csGoRekt.webm", "description": "CSGO Smurfin", "poster": ""},
{"src": "Files/vrBlyaat.webm", "description": "VR", "poster": ""},
{"src": "Files/britishPoliteness.webm", "description": "", "poster": ""},
{"src": "Files/thatsGay0.webm", "description": "Polite Crash", "poster": ""},
{"src": "Files/gangstaHotline.webm", "description": "Gangsta Hotline", "poster": ""},
{"src": "Files/evanescence.webm", "description": "", "poster": ""},
{"src": "Files/longGoneee.webm", "description": "", "poster": ""},
{"src": "Files/growUpM8.webm", "description": "", "poster": ""},
{"src": "Files/shippingStandards.webm", "description": "", "poster": ""},
{"src": "Files/boooboo.webm", "description": "", "poster": ""},
{"src": "Files/classie.webm", "description": "", "poster": ""},
{"src": "Files/mchelinMan.webm", "description": "", "poster": ""},
{"src": "Files/justARL.webm", "description": "", "poster": ""},
{"src": "Files/dankFlip.webm", "description": "", "poster": ""},
{"src": "Files/Famas.webm", "description": "", "poster": ""},
{"src": "Files/whatADickM8.webm", "description": "", "poster": ""},
{"src": "Files/RustFuckUU.webm", "description": "", "poster": ""},
{"src": "Files/amazonGo.webm", "description": "", "poster": ""},
{"src": "Files/skillzNigga.webm", "description": "", "poster": ""},
{"src": "Files/whiteKnight.webm", "description": "", "poster": ""},
{"src": "Files/whatElse.webm", "description": "", "poster": ""},
{"src": "Files/ohhhhhhhhhhh.webm", "description": "", "poster": ""},
{"src": "Files/aaaaaaaaaaaaa.webm", "description": "", "poster": ""},
{"src": "Files/herroRife.webm", "description": "", "poster": ""},
{"src": "Files/carCanoe.webm", "description": "", "poster": ""},
{"src": "Files/driftingPlane.webm", "description": "", "poster": ""},
{"src": "Files/comin4YouIsis.webm", "description": "", "poster": ""},
{"src": "Files/heilHitlaGranny.webm", "description": "", "poster": ""},
{"src": "Files/fookinBear.webm", "description": "", "poster": ""},
{"src": "Files/merryXmasHilldog.webm", "description": "", "poster": ""},
{"src": "Files/playHasBeenKicked.webm", "description": "", "poster": ""},
{"src": "Files/stickAndStonesFems.webm", "description": "", "poster": ""},
{"src": "Files/catCeption.webm", "description": "", "poster": ""},
{"src": "Files/1234.webm", "description": "", "poster": ""},
{"src": "Files/comeBackHereFag.webm", "description": "", "poster": ""},
{"src": "Files/militaryTraining.webm", "description": "", "poster": ""},
{"src": "Files/onlyHuman.webm", "description": "", "poster": ""},
{"src": "Files/breakCheck.webm", "description": "", "poster": ""},
{"src": "Files/grabherPussy.webm", "description": "", "poster": ""},
{"src": "Files/ausieshay.webm", "description": "", "poster": ""},
{"src": "Files/harmonica.webm", "description": "", "poster": ""},
{"src": "Files/deadGiveAway.webm", "description": "", "poster": ""},
{"src": "Files/runnnnnnnn.webm", "description": "", "poster": ""},
{"src": "Files/notTodayM8.webm", "description": "", "poster": ""},
{"src": "Files/lameAssKid.webm", "description": "", "poster": ""},
{"src": "Files/imGay2.webm", "description": "", "poster": ""},
{"src": "Files/borkingDead.webm", "description": "", "poster": ""},
{"src": "Files/hillaryForPrez.webm", "description": "", "poster": ""},
{"src": "Files/fSurrenders.webm", "description": "", "poster": ""},
{"src": "Files/dropItMont.webm", "description": "", "poster": ""},
{"src": "Files/treatUrself.webm", "description": "", "poster": ""},
{"src": "Files/uWouldBeInJail.webm", "description": "", "poster": ""},
{"src": "Files/seatBelts.webm", "description": "", "poster": ""},
{"src": "Files/iThinkHeIsGay.webm", "description": "", "poster": ""},
{"src": "Files/theHustle.webm", "description": "", "poster": ""},
{"src": "Files/noReallyFunny.webm", "description": "", "poster": ""},
{"src": "Files/disnutz.webm", "description": "", "poster": ""},
{"src": "Files/warFace.webm", "description": "", "poster": ""},
{"src": "Files/travisDancingMeme.webm", "description": "", "poster": ""},
{"src": "Files/shitOnHisMomMeme.webm", "description": "", "poster": ""},
{"src": "Files/nWhat.webm", "description": "", "poster": ""},
{"src": "Files/theBirdsMeme.webm", "description": "", "poster": ""},
{"src": "Files/funFunMeme.webm", "description": "", "poster": ""},
{"src": "Files/psaMeme.webm", "description": "", "poster": ""},
{"src": "Files/grannyBikeMeme.webm", "description": "", "poster": ""},
{"src": "Files/harryPotterJihadMeme.webm", "description": "", "poster": ""},
{"src": "Files/notMadeToFuck.webm", "description": "", "poster": ""},
{"src": "Files/machineGunCat.webm", "description": "", "poster": ""},
{"src": "Files/bf1Meme.webm", "description": "", "poster": ""},
{"src": "Files/catTripMeme.webm", "description": "", "poster": ""},
{"src": "Files/doItMeme.webm", "description": "", "poster": ""},
{"src": "Files/owlShit.webm", "description": "", "poster": ""},
{"src": "Files/dankDancing.webm", "description": "", "poster": ""},
{"src": "Files/ratchetSong.webm", "description": "", "poster": ""},
{"src": "Files/sausage.webm", "description": "", "poster": ""},
{"src": "Files/uGuessin.webm", "description": "", "poster": ""},
{"src": "Files/mJackson.webm", "description": "", "poster": ""},
{"src": "Files/superManBikerMeme.mp4", "description": "", "poster": ""},
{"src": "Files/blackOutMeme.webm", "description": "", "poster": ""},
{"src": "Files/blessYourSoul.mp4", "description": "", "poster": ""},
{"src": "Files/pugOutTheWayMeme.webm", "description": "", "poster": ""},
{"src": "Files/takingTheHardWayMeme.webm", "description": "", "poster": ""},
{"src": "Files/karmaKidMeme.webm", "description": "", "poster": ""},
{"src": "Files/kanyeMeme.webm", "description": "Kanye", "poster": ""},
{"src": "Files/bodiesMeme.webm", "description": "Bodies", "poster": ""},
{"src": "Files/SnowManMeme.webm", "description": "Snow Man", "poster": ""},
{"src": "Files/bokuMeme.webm", "description": "Boku", "poster": ""},
{"src": "Files/FreshPrinceMeme.webm", "description": "Fresh Prince", "poster": ""},
{"src": "Files/SevenLegsMeme.webm", "description": "Seven Legs", "poster": ""},
{"src": "Files/1800Meme.webm", "description": "1-800", "poster": ""},
{"src": "Files/HotCosbyMeme.webm", "description": "Hot Cosby", "poster": ""},
{"src": "Files/catMeme.webm", "description": "Cat", "poster": ""},
{"src": "Files/poorDogMeme.webm", "description": "Poor Dog", "poster": ""},
{"src": "Files/awkwardHandshakeMeme.webm", "description": "Awkward Handshake", "poster": ""},
{"src": "Files/yaaakMeme.webm", "description": "Yaak", "poster": ""},
{"src": "Files/boomBoomBoomMeme.webm", "description": "Boom Boom", "poster": ""},
{"src": "Files/relaxingMeme.webm", "description": "Relaxing", "poster": ""},
{"src": "Files/wakeUpMeme.webm", "description": "Wake Up", "poster": ""},
{"src": "Files/soCalmMeme.webm", "description": "So Calm", "poster": ""},
{"src": "Files/paperToMouthMeme.webm", "description": "Paper To Mouth", "poster": ""},
{"src": "Files/nerdFailMeme.webm", "description": "Nerd Fail", "poster": ""},
{"src": "Files/geeseScreamMeme.webm", "description": "Geese Scream", "poster": ""},
{"src": "Files/mamaMeme.webm", "description": "Mama Meme", "poster": ""},
{"src": "Files/fkedYoBitchMeme.webm", "description": "Fucked Yo Bitch", "poster": ""},
{"src": "Files/goodMorningBaltimoreMeme.webm", "description": "Good Morning Baltimore", "poster": ""},
{"src": "Files/itGoesMeme.webm", "description": "It Goes", "poster": ""},
{"src": "Files/stateFarmMeme.webm", "description": "State Farm", "poster": ""},
{"src": "Files/fuckThisGayEarth.webm", "description": "Fuck This Gay Earth", "poster": ""},
{"src": "Files/haawMeme.webm", "description": "Haaw", "poster": ""},
{"src": "Files/bopbopMeme.webm", "description": "bop bop", "poster": ""},
{"src": "Files/deezNutzMeme.webm", "description": "Deez Nuts", "poster": ""},
{"src": "Files/haitiMeme.webm", "description": "Haiti", "poster": ""},
{"src": "Files/krabbyPattyMeme.webm", "description": "Krabby Patty", "poster": ""},
{"src": "Files/breakingDancingFlyMeme.webm", "description": "Break Dancing Fly", "poster": ""},
{"src": "Files/iRuleeMeme.webm", "description": "I Rule", "poster": ""},
{"src": "Files/basketballBeatMeme.webm", "description": "Basketball Beat", "poster": ""},
{"src": "Files/dankBeatMeme.webm", "description": "Dank Beat", "poster": ""},
{"src": "Files/rektIdiotsMeme.webm", "description": "Rekt Idiots", "poster": ""},
{"src": "Files/stickItMeme.webm", "description": "Stick It", "poster": ""},
{"src": "Files/freeRealEstateMeme.webm", "description": "Free Real Estate", "poster": ""},
{"src": "Files/whereYouFromMeme.webm", "description": "Where You From", "poster": ""},
{"src": "Files/xxxRatedMeme.webm", "description": "XXX Rated", "poster": ""},
{"src": "Files/blindFootballMeme.webm", "description": "Blind Football", "poster": ""},
{"src": "Files/tSwiftMeme.webm", "description": "Taylor Swift", "poster": ""},
{"src": "Files/britMeme.webm", "description": "Brits", "poster": ""},
{"src": "Files/imRetardedMeme.webm", "description": "I'm Retarded", "poster": ""},
{"src": "Files/hitlaMeme.webm", "description": "Hitla", "poster": ""},
{"src": "Files/birdLifeMeme.webm", "description": "Bird Life", "poster": ""},
{"src": "Files/gangstaMeme.webm", "description": "Gangsta", "poster": ""},
{"src": "Files/brokenChairMeme.webm", "description": "Broken Chair", "poster": ""},
{"src": "Files/failFireworksMeme.webm", "description": "Fail Fireworks", "poster": ""},
{"src": "Files/overboardMeme.webm", "description": "Overboard", "poster": ""},
{"src": "Files/freeTacoMeme.webm", "description": "Free Taco", "poster": ""},
{"src": "Files/missYouMeme.webm", "description": "Miss You", "poster": ""},
{"src": "Files/failStartMeme.webm", "description": "Fail Start", "poster": ""},
{"src": "Files/noManBuy.mp4", "description": "No Man Buy", "poster": ""},
{"src": "Files/pianoMeme.webm", "description": "Piano", "poster": ""},
{"src": "Files/nyamNyamMeme.webm", "description": "Nyam Nyam", "poster": ""},
{"src": "Files/rapBattleMeme.webm", "description": "Rap Battle", "poster": ""},
{"src": "Files/markMeme.webm", "description": "Mark", "poster": ""},
{"src": "Files/waitWaitWaitMeme.webm", "description": "Wait Wait", "poster": ""},
{"src": "Files/batmanCookieMeme.webm", "description": "Batman Cookies", "poster": ""},
{"src": "Files/starTreckMeme.webm", "description": "Star Treck", "poster": ""},
{"src": "Files/raceCarSeagMeme.webm", "description": "Race Car", "poster": ""},
{"src": "Files/dumbBitchMeme.webm", "description": "Dumb Bitch", "poster": ""},
{"src": "Files/helloItsMeMeme.webm", "description": "Hello It's Me", "poster": ""},
{"src": "Files/noFlinchMeme.webm", "description": "No Flinch", "poster": ""},
{"src": "Files/beatItUpMeme.webm", "description": "Beat It Up", "poster": ""},
{"src": "Files/joshMovieReviewMeme.webm", "description": "Josh's Movie Review", "poster": ""},
{"src": "Files/oliveGardenMeme.webm", "description": "Olive Garden", "poster": ""},
{"src": "Files/thugLyfeMeme.webm", "description": "Thug Lyfe", "poster": ""},
{"src": "Files/wrongBibleMeme.webm", "description": "Wrong Bible", "poster": ""},
{"src": "Files/woohooMeme.webm", "description": "Woohoo", "poster": ""},
{"src": "Files/dontStopCominMeme.webm", "description": "Don't Stop Comin", "poster": ""},
{"src": "Files/taptaptapMeme.webm", "description": "Tap Tap", "poster": ""},
{"src": "Files/uglyAssNiggaMeme.webm", "description": "Ugly Ass", "poster": ""},
{"src": "Files/redCardMeme.webm", "description": "Red Card", "poster": ""},
{"src": "Files/rockTheBoatMeme.webm", "description": "Rock The Boat", "poster": ""},
{"src": "Files/superCar.webm", "description": "Super Car", "poster": ""},
{"src": "Files/dopeyDogMeme.webm", "description": "Dopey Dog", "poster": ""},
{"src": "Files/stutterMeme.webm", "description": "Stutter", "poster": ""},
{"src": "Files/internetProvidersMeme.webm", "description": "Internet Provider", "poster": ""},
{"src": "Files/ohShithahaMeme.webm", "description": "Oh Shit", "poster": ""},
{"src": "Files/animeWasMistakeMeme.webm", "description": "Anime Was A Mistake", "poster": ""},
{"src": "Files/NewMovieMeme.webm", "description": "New Movie", "poster": ""},
{"src": "Files/fuckkMeme.webm", "description": "Fuckkk", "poster": ""},
{"src": "Files/fkinwithSniperMeme.webm", "description": "Snipers", "poster": ""},
{"src": "Files/fuckHillaryMeme.webm", "description": "Fuck Hillary", "poster": ""},
{"src": "Files/eyesNotRealMeme.webm", "description": "Eyes Not Real", "poster": ""},
{"src": "Files/favoriteTripMeme.webm", "description": "Trip", "poster": ""},
{"src": "Files/coffeeStrongMeme.webm", "description": "Strong Coffee", "poster": ""},
{"src": "Files/scaredCatMeme.webm", "description": "Cat", "poster": ""},
{"src": "Files/dundundunanaMeme.webm", "description": "Dun Dun", "poster": ""},
{"src": "Files/fearExcerciseMeme.webm", "description": "Fear Excercise", "poster": ""},
{"src": "Files/imthaoneMeme.webm", "description": "Im The one", "poster": ""},
{"src": "Files/shovelSongMeme.webm", "description": "Shovel Song", "poster": ""},
{"src": "Files/fuckCheckersMeme.webm", "description": "Fuck Checkers", "poster": ""},
{"src": "Files/tonsOfPainMeme.webm", "description": "Tons Of Pain", "poster": ""},
{"src": "Files/penguinTrainMeme.webm", "description": "Penguin Train", "poster": ""},
{"src": "Files/fearlessMeme.webm", "description": "Fearless", "poster": ""},
{"src": "Files/hungerGamesMeme.webm", "description": "Hunger Games", "poster": ""},
{"src": "Files/slapAssmeme.webm", "description": "Slap Ass", "poster": ""},
{"src": "Files/partyPPLMeme.webm", "description": "Party People", "poster": ""},
{"src": "Files/snoopDogMeme.webm", "description": "SnoopDoggy", "poster": ""},
{"src": "Files/jurassicMeme.webm", "description": "Jurassic", "poster": ""},
{"src": "Files/titanicPaintMeme.webm", "description": "Titanic", "poster": ""},
{"src": "Files/wubwubMeme.webm", "description": "Wub Wub", "poster": ""},
{"src": "Files/titanicMeme.webm", "description": "Titanic", "poster": ""},
{"src": "Files/thomasMeme.webm", "description": "Thomas", "poster": ""},
{"src": "Files/HUMPdayMeme.webm", "description": "Hump Day", "poster": ""},
{"src": "Files/improvMeme.webm", "description": "Improv", "poster": ""},
{"src": "Files/halfWorldMeme.webm", "description": "Half World", "poster": ""},
{"src": "Files/jumpFail2Meme.webm", "description": "Jump Fail", "poster": ""},
{"src": "Files/hologramMeme.webm", "description": "Hologram", "poster": ""},
{"src": "Files/holeefukMeme.webm", "description": "Ho lee", "poster": ""},
{"src": "Files/enemySpotted.webm", "description": "Enemy Spotted", "poster": ""},
{"src": "Files/baltonMeme.webm", "description": "Balton", "poster": ""},
{"src": "Files/bamBamMeme.webm", "description": "Bam Bam", "poster": ""},
{"src": "Files/basketballMeme.webm", "description": "Basketball", "poster": ""},
{"src": "Files/cs1.6Meme.webm", "description": "CS1", "poster": ""},
{"src": "Files/balloonMeme.webm", "description": "Balloon", "poster": ""},
{"src": "Files/diveInMeme.webm", "description": "Dive In", "poster": ""},
{"src": "Files/swarsMeme.webm", "description": "Star Wars", "poster": ""},
{"src": "Files/race1Meme.webm", "description": "Race 1", "poster": ""},
{"src": "Files/screwDaLawMeme.webm", "description": "Screw Da Law", "poster": ""},
{"src": "Files/jumpFailMeme.webm", "description": "Jump Fail", "poster": ""},
{"src": "Files/imsorryvideo.webm", "description": "I'm Sorry", "poster": ""},
{"src": "Files/highlightBlingMeme.webm", "description": "HighlightBling", "poster": ""},
{"src": "Files/gotemMeme.webm", "description": "Gotem", "poster": ""},
{"src": "Files/britishMeme.webm", "description": "British", "poster": ""},
{"src": "Files/boobTapMeme.webm", "description": "WTF", "poster": ""},
{"src": "Files/headAppleMeme.webm", "description": "Apples", "poster": ""},
{"src": "Files/yesMeme.webm", "description": "Yes", "poster": ""},
{"src": "Files/songMeme.webm", "description": "Song", "poster": ""},
{"src": "Files/dangerMeme.webm", "description": "Danger", "poster": ""},
{"src": "Files/20is20Meme.webm", "description": "20 is 20", "poster": ""},
{"src": "Files/wtfMeme.webm", "description": "WTF", "poster": ""},
{"src": "Files/idgafMeme.webm", "description": "IDGAF", "poster": ""},
{"src": "Files/toasterMeme.webm", "description": "Toaster", "poster": ""},
{"src": "Files/brokenAssMeme.webm", "description": "Broken Ass Meme", "poster": ""},
{"src": "Files/allahuMeme.webm", "description": "Allah", "poster": ""},
{"src": "Files/darudeMeme.webm", "description": "Darude", "poster": ""},
  ]
};
