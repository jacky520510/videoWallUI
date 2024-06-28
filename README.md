# videoWallUI
A webpage about how to display videoWall which is based on native HTML+JavaScript+CSS  
一款基于原生html+javascript+css的视屏墙网页  
  
How to use:  
怎样使用：  
1.import videoWallUI.js like '<script src="videoWallUI.js"></script>'  
  引入videoWallUI.js，比如：'<script src="videoWallUI.js"></script>'  
2.type a div element like 
```html
<div id="videoWallContainer" style="width:1000px;height:600px;"></div>
```
  编写一个div元素，比如：
  ```html
<div id="videoWallContainer" style="width:1000px;height:600px;"></div>
```
3.type a function and add 'VideoWallUI.Init("videoWallContainer", 4, 1,IconClick,sliderChange)' into your function;  
  params: 1) div's id  
          2) videoWall's screen num to display  
          3) statusBar style(0:live 1:playback)  
          4) callback function the img clicked in live model and playback model  
          5) callback function the slider changed value in playback model  
  编写一个函数，并将'VideoWallUI.Init("videoWallContainer", 4, 1,IconClick,sliderChange)'放入你的函数内  
  参数：1) div的id  
        2) 要展示的视频墙的窗口数  
        3) 状态栏样式(0:live 1:playback)  
        4) live模式下和playback模式下img点击的回调函数  
        5) playback模式下滑杆拉动后的回调函数  
  For details, please refer to videoWall.html  
  详见videoWall.html  
