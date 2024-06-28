class VideoWallUI {
	static play = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9UlEQVR4nLWSMXLCMBBF/zpj0qYOFG5JUiQ34CbxDTAngCNwBHESzA1cwNBSQE+LPbB8GcQs7sDDm9GMRvp+u5IlaMlrBL2yP1Tgj1NDNN91VjNO7hCOG4n+flTVYSry5rbxMoehV/0MVI9pHL9nGyn2XKq5E3TLvmsGLKHArrNOceUm4McZKxehMsMJgP2mIbt0ogmP40CswFnz5+FrAui/SDRheAaDzQpHjV301ALRMac+lPMSRxQVIDbLvQt20dMQLCjIHhdA0+sRHAw2awXtLtFDyfO/0RMC7OS5hxTolt8pcBpwW1GjzEV5aNvCjXa0FpwBe/yiESDXL9wAAAAASUVORK5CYII=";
	static pause = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzElEQVR4nNWSPQ6CQBCFZzVgay0UtEQLPYEchRvIUTzCehLxBhQaWguxtnWJrm/RJQOxYmPhl2wymZl987MryJHfCIQq3miiFUzGaF/5px2MDgKnJdLLaV3ft0KM5cU75sQI60Wi9SP1vEl2FsUNroaOQKBi2U/g2AKVX6b0oRXA5QyVi37lPu9OdIRxJAEuILnyTMUawQNMwj7WV78UMBt47len4T8F3JZogMjwZzTYBHQy7CNZAjVPiZ4JwhjfYNYxym3bHATccBZ4ATiQlhHrE1baAAAAAElFTkSuQmCC";
	static stop = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiUlEQVR4nK2RUU7CQBCGZyjUV3wVTHilatIbUE8gnIB6AuoJrCewnAA4gXgCyw2aqPBKIvgKrxba8V+ktaQSTPRLJt2d3fl2usv0R/YKqquLRkyRRaBAmj8rPY8wzMGIHaphvSPErpCUsThCioSowcRLJnFn+qSLVAojUiqh0cP2Fs505vprnzJUwjObKPZQ8jDXx9e0hREbKmHdwcdFsYXigH4AEhMSn7Bvrk88fLMCY4HpDYr7NTFr4TpsI52iF/XBlIMpJDa6vEcXxwQ2gurq3BKJhrCWMaWTD8MlllsMvxG+ez8auwTQ7ZJZa85KL/5GoAqYxYLAIqDmBwS+CPtq/j+C03W9GcfcS/7rsMBYMBda6S8oYF3iBRx1ibgoU0SaSKcw8xBrAdZsvISHbssEUoE6lZk6SF2qjUjlQLGJVp5EqJt0kwoU6KKP1BXCgWRAGVDcRrGHeMTpNm1hxA5fnYiDJcHmACnAJsaMi/OSkxNyggR1sVGkCok0TYK34mSIYY69gt/yCfDAxhFLwFnOAAAAAElFTkSuQmCC";

	//使用#前缀定义私有字段，这些字段只能在类的内部访问
	#Container = undefined;
	#ScreenNumber = -1;
	#SelectedScreen = undefined;
	#VideoWidth = 0;
	#VideoHeight = 0;
	#SelectVideoIndex = -1;
	#VideoType = 0; //0:preview	1:playback
	#IconCallBackFunc = undefined;
	#RangeCallBackFunc = undefined;

	static SetScreenNumber(paNum) {
		this.ScreenNumber = paNum;
	}

	static GetScreenNumber() {
		return this.ScreenNumber;
	}

	static SetContainer(paId) {
		this.Container = document.getElementById(paId);
		this.Container.style.position = "relative";
		this.Container.style.background = "rgba(0,0,0,0.9)";
	}

	static GetContainer() {
		return this.Container;
	}

	static SetSelectedScreen(paScreen) {
		this.SelectedScreen = paScreen;
	}

	static GetSelectedScreen() {
		return this.SelectedScreen;
	}

	static SetVideoWith(paVideoWidth) {
		this.VideoWidth = paVideoWidth;
	}

	static GetVideoWith() {
		return this.VideoWidth;
	}

	static SetVideoHeight(paVideoHeight) {
		this.VideoHeight = paVideoHeight;
	}

	static GetVideoHeight() {
		return this.VideoHeight;
	}

	static SetSelectVideoIndex(paIndex) {
		this.SelectVideoIndex = paIndex;
	}

	static GetSelectVideoIndex() {
		return this.SelectVideoIndex;
	}

	static SetVideoType(paVideoType) {
		this.VideoType = parseInt(paVideoType);
	}

	static GetVideoType() {
		return this.VideoType;
	}

	static SetIconCallBackFunc(paFunc) {
		this.IconCallBackFunc = paFunc;
	}

	static EmitIconCallBackFunc(paDom) {
		eval(this.IconCallBackFunc(document.getElementById(paDom.getAttribute('video')), paDom.getAttribute('pts')));
		if (paDom.getAttribute('pts') == "play") {
			paDom.src = this.pause;
			paDom.setAttribute('pts', "pause");
			paDom.alt = "暂停";
			paDom.title = "暂停";
		} else if (paDom.getAttribute('pts') == "pause") {
			paDom.src = this.play;
			paDom.setAttribute('pts', "play");
			paDom.alt = "播放";
			paDom.title = "播放";
		} else if (paDom.getAttribute('pts') == "stop") {
			paDom.previousElementSibling.src = this.play;
			paDom.previousElementSibling.setAttribute('pts', "play");
			paDom.previousElementSibling.alt = "播放";
			paDom.previousElementSibling.title = "播放";
		}
	}

	static SetRangeCallBackFunc(paFunc) {
		this.RangeCallBackFunc = paFunc;
	}

	static EmitRangeCallBackFunc(paDom) {
		//console.dir(paDom)
		let rangeValue = paDom.value;
		if (this.RangeCallBackFunc) {
			eval(this.RangeCallBackFunc(document.getElementById(paDom.getAttribute('video')), rangeValue));
		} else {
			console.log("SetRangeCallBackFunc error:No function was setted");
		}
	}

	static SetPlaybackDuration(paVideo, paStartTime, paEndTime) { //"20240618T000000", "20240618T125959"
		//console.log(paVideo)
		if (!paVideo) {
			console.log("SetPlaybackDuration error:No Selected Screen");
			return;
		}

		let rangeDom = document.querySelectorAll('[video="' + paVideo.id + '"]');
		//console.log(rangeDom)

		// 定义匹配日期时间格式的正则表达式
		let regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
		// 使用正则表达式测试字符串是否匹配
		if (!regex.test(paStartTime) || !regex.test(paEndTime)) {
			console.log("date format error,must be: YYYY-MM-DD HH:MM:SS");
			return;
		}

		try {
			// 将时间字符串转换为Date对象
			let startTime = new Date(paStartTime);
			let endTime = new Date(paEndTime);
			//console.log(startTime, endTime)
			// 计算两个时间的毫秒差
			let timeDifference = endTime.getTime() - startTime.getTime();
			console.log(timeDifference)
			if (isNaN(timeDifference)) {
				console.log("SetPlaybackDuration error:TimeFormat was Wrong");
				return;
			}
			// 将毫秒差转换为小时、分钟和秒
			let hours = Math.floor(timeDifference / 1000 / 60 / 60);
			let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
			let seconds = Math.floor((timeDifference / 1000) % 60);
			Array.from(rangeDom).filter(item => item.type == "range").forEach(function(range) {
				//console.log(range)
				range.min = "0";
				range.max = timeDifference / 1000;
				range.step = 1;
				document.getElementById("startTime" + range.id.replace("range", "")).innerText = "0:0:0";
				document.getElementById("endTime" + range.id.replace("range", "")).innerText = hours + ":" + minutes + ":" + seconds;
			});
		} catch (e) {
			console.log("SetPlaybackDuration error:" + e.message);
		}
	}

	static Init(paId, paScreenNums, paVideoType, paIconClickFunc, paSliderChangeFunc) {
		this.SetContainer(paId);
		this.SetScreenNumber(paScreenNums);
		this.SetVideoWith(352);
		this.SetVideoHeight(288);
		this.SetSelectVideoIndex(-1);
		this.SetVideoType(paVideoType);
		this.CreateVideo();
		this.CreateMainStatusBar();
		this.LayoutScreens(paScreenNums);
		this.SetIconCallBackFunc(paIconClickFunc)
		this.SetRangeCallBackFunc(paSliderChangeFunc)
	}

	static CreateVideo() {
		let arrowUp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAOBJREFUOE+1k1EOgjAMhtuRLPEGii/6BlxCuQmcRDyJ3ARPIby5F9EbGEjYzIQlw21EQ+zTsvb/2q4rwkzDmXqYBCyfwYZ4WPBOxI9FxWzJnIBBfB1EzAWxAsZizAFEAgBWiAHQxQgivdEq95soAxQHG8QA+G0oZNlKrPrWITUtt+reBDRRhsiZzCyD1m2QqLOE6L4+0YSt2rBAgD0A5jW9pD9NQYkFwHkKYq1Az8w7fiSEJP0jmpUYAFvZ78k4ICOADEQPTwjIPntWEIFid6dl7JyCDHR9W5vvv8v0zaa+AI6lfRGiBl2wAAAAAElFTkSuQmCC";
		let zoomOut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAANRJREFUOE/Nk0EOgkAMRX8xwXgDgxvcoafQk6gnAU6C3oRTKDtnA/EGRhKmppohjIIR2TgrkrZvaPuGMPCQqZ9eA/8yyVRf3gMgxc6IzmCKibRiUFK4pxouOV65YALv5JtBoa54LRfWSd5tGYE4ZCAlYNUGMDEB5W62F1gNmJXBVsgAfAm0AZ63I3XAhzeA/GKz/y6AyTFxq8++A7Ra+KX4zwCDhyhr1KCNOPBpjQAUgeMuD5JvRBJji/Exsob4omqnysyOL8bqiueWyn3W2Hx4g0W6A7QcdxHrSRpcAAAAAElFTkSuQmCC";
		let zoomIn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAOVJREFUOE/FUlEOwVAQnCUqbkD5qL/WKbgJJ8FJuImegv7VB+UG4km7snSl9CFBYj/37c6bnRnCl0Vf7uMG4JqAFYzAo60TzYvg7rE3AfFYe4mzuuyWABgId85qYGPWMsGCgL68PQGgOcBDME2T+nJSBGkbf8igGXCdKQHIgNBWqlnK3X0jWgtI8+B7lSrFeprM6AdWEWVBl5WFrXenwadu/M7GIoPOye9valFY7L09QYXJ1R5nKQ8eRVR3XNObJc5yZMnB1aJXQZKcSBY+CpJrghiA9yJI+dWWIAntS8jyKjH4m41n3TWGEaYieaoAAAAASUVORK5CYII=";

		//创建css样式
		const styleElement = document.querySelector('head style');
		// 如果<style>标签存在
		if (styleElement) {
			// 插入新的CSS规则
			if (styleElement.sheet) {
				styleElement.sheet.insertRule("input.ne-range[type=range]::-webkit-slider-thumb {width: 6px; height: 6px; border-radius: 50%; border: 0; background-color: #FFF; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.21); -webkit-transition: border-color 0.15s, background-color 0.15s; transition: border-color 0.15s, background-color 0.15s; cursor: pointer; background-clip: padding-box; box-sizing: border-box; -webkit-appearance: none !important;}", styleElement.sheet.cssRules.length);
				styleElement.sheet.insertRule("input.ne-range[type=range]::-webkit-slider-thumb:active { border: 0; background-color: #FFF;}", styleElement.sheet.cssRules.length);
				styleElement.sheet.insertRule("input.ne-range[type=range] {left:0px;width: 99%; height: 2px; border-radius: 8px; margin: .8em 0; padding: 0; cursor: pointer; border: 0; background: -webkit-linear-gradient(#FFF, #FFF) no-repeat #999999; background-size: 0% 100%; position: relative; outline: 0; top: -9px; -webkit-appearance: none !important;}", styleElement.sheet.cssRules.length);
			}
		} else {
			// 如果<style>标签不存在，创建一个新的
			const newStyle = document.createElement('style');
			newStyle.innerHTML = "";
			newStyle.innerHTML += "input.ne-range[type=range]::-webkit-slider-thumb {width: 6px; height: 6px; border-radius: 50%; border: 0; background-color: #FFF; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.21); -webkit-transition: border-color 0.15s, background-color 0.15s; transition: border-color 0.15s, background-color 0.15s; cursor: pointer; background-clip: padding-box; box-sizing: border-box; -webkit-appearance: none !important;}";
			newStyle.innerHTML += "input.ne-range[type=range]::-webkit-slider-thumb:active { border: 0; background-color: #FFF;}";
			newStyle.innerHTML += "input.ne-range[type=range] {left:0px;width: 99%; height: 2px; border-radius: 8px; margin: .8em 0; padding: 0; cursor: pointer; border: 0; background: -webkit-linear-gradient(#FFF, #FFF) no-repeat #999999; background-size: 0% 100%; position: relative; outline: 0; top: -9px; -webkit-appearance: none !important;}";
			document.head.appendChild(newStyle);
		}

		for (let i = 1; i <= 16; i++) {
			//创建videoContainer
			let videoContainer = document.createElement('div');
			videoContainer.id = "videoContainer" + i;
			videoContainer.width = this.VideoWith;
			videoContainer.height = this.VideoHeight;
			videoContainer.style.background = "#00000000";
			videoContainer.style.cssFloat = "left";
			videoContainer.style.position = "relative";
			//创建video
			let videoElement = document.createElement('video');
			videoElement.id = "video" + i;
			videoElement.src = "";
			videoElement.width = this.VideoWith;
			videoElement.height = this.VideoHeight;
			videoElement.style.width = "100%";
			videoElement.style.height = "100%";
			//创建video下方的状态栏
			let statusBar = document.createElement('div');
			statusBar.id = "statusBar" + i;
			statusBar.style.width = "100%";
			statusBar.style.height = "auto";
			statusBar.style.background = "rgba(255,255,255,0.2)";
			statusBar.style.position = "absolute";
			statusBar.style.bottom = "0px";
			statusBar.style.left = "0px";
			statusBar.style.padding = "1px";
			statusBar.style.position = "absolute";
			statusBar.style.alignItems = "center";
			statusBar.style.display = "none";
			//创建状态栏下的直播操作
			let statusBarPreview = document.createElement('div');
			statusBarPreview.id = "statusBarPreview" + i;
			statusBarPreview.style.width = "100%";
			statusBarPreview.style.height = "20px";
			statusBarPreview.style.display = this.VideoType == 0 ? "block" : "none";
			statusBarPreview.innerHTML = "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='left' alt='云台左转' title='云台左转' style='transform: rotate(-90deg);' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='left_up' alt='云台左上转' title='云台左上转' style='transform: rotate(-45deg);' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='up' alt='云台上转' title='云台上转' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='right_up' alt='云台右上转' title='云台右上转' style='transform: rotate(45deg);' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='right' alt='云台右转' title='云台右转' style='transform: rotate(90deg);' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='right_down' alt='云台右下转' title='云台右下转'  style='transform: rotate(135deg);' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='down' alt='云台下转' title='云台下转' style='transform: rotate(180deg);' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + arrowUp + "' video='video" + i + "' width=16 height=16 pts='left_down' alt='云台左下转' title='云台左下转' style='transform: rotate(-135deg);' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + zoomIn + "' video='video" + i + "' width=16 height=16 pts='zoom_in' alt='云台放大' title='云台放大' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPreview.innerHTML += "&nbsp;<img src='" + zoomOut + "' video='video" + i + "' width=16 height=16 pts='zoom_out' alt='云台缩小' title='云台缩小' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBar.append(statusBarPreview);
			//创建状态栏下的回放操作
			let statusBarPlayback = document.createElement('div');
			statusBarPlayback.id = "statusBarPlayback" + i;
			statusBarPlayback.style.width = "100%";
			statusBarPlayback.style.height = "40px";
			statusBarPlayback.style.display = this.VideoType == 1 ? "block" : "none";
			let statusBarPlaybackSlider = document.createElement('div');
			statusBarPlaybackSlider.style.display = "flex";
			statusBarPlaybackSlider.style.width = "100%";
			statusBarPlaybackSlider.style.height = "20px";
			statusBarPlaybackSlider.innerHTML += "<!-- 开始时间 --><div style='padding-left:2px; width: 25px; border:0px solid #FFFF00; color: #aaa; font-size:10px' id='startTime" + i + "'>0:0</div>";
			statusBarPlaybackSlider.innerHTML += "<!-- 滑块 --><div style='flex-grow: 1; border:0px solid #FFFF00;'><input type='range'  id='range" + i + "' video='video" + i + "'  class='ne-range' value='0' onclick='VideoWallUI.EmitRangeCallBackFunc(this)' /></div>"
			statusBarPlaybackSlider.innerHTML += "<!-- 结束时间 --><div style='padding-right:2px; width: 45px; border:0px solid #FFFF00; color: #aaa;;font-size:10px' id='endTime" + i + "'>0:0</div>";
			statusBarPlayback.append(statusBarPlaybackSlider);
			let statusBarPlaybackControl = document.createElement('div');
			statusBarPlaybackControl.style.display = "flex";
			statusBarPlaybackControl.style.width = "100%";
			statusBarPlaybackControl.style.height = "20px";
			statusBarPlaybackControl.style.justifyContent = "center";
			statusBarPlaybackControl.innerHTML += "<img src='" + this.play + "' video='video" + i + "' width=16 height=16 pts='play' alt='播放' title='播放' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPlaybackControl.innerHTML += "&nbsp;<img src='" + this.stop + "' video='video" + i + "' width=16 height=16 pts='stop' alt='停止' title='停止' onclick='VideoWallUI.EmitIconCallBackFunc(this)'>";
			statusBarPlayback.append(statusBarPlaybackControl);
			statusBar.append(statusBarPlayback);
			videoContainer.append(videoElement);
			videoContainer.append(statusBar);
			videoContainer.addEventListener('mouseover', () => statusBar.style.display = 'block');
			videoContainer.addEventListener('mouseout', () => statusBar.style.display = 'none');
			this.Container.append(videoContainer);
		}
	}

	static CreateMainStatusBar() {
		//创建下方的总状态栏
		let fullScreen = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAMZJREFUOE+9k0EOgjAURP+UiPEGBjewQy6BnkS9CZ6EeBLxEsgOF4Z4AwMJ/aZETCxGrBi77n+dmT8FDTwYOE8NwKmCmIgXRjDGrhinEaZX3xUW9rLmpQmgnXkACvvomQCcap6rR78HlEH0ZMFUQau2V8Gs8tfMwtXtCSGT8yhL3gKcMogYHIJx6OQDXvVmoABqUHnVAR+F+F+AXqTLJDs1AZIIZS23nRAtqB54r6t8r6lqKSzEIOpsgQhJYaeb33wmkwrrd29M84ZylD57vQAAAABJRU5ErkJggg==";
		let screen1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADpJREFUOE9jZKAQMIL0S//SXEyOOU/ZrsfCDfjPwBBDiiGMDAxLRg0YDYPhmA5IyQcwtfC8QI5mmB4AfeZQETbEiiwAAAAASUVORK5CYII=";
		let screen4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIJJREFUOE9jZKAQMIL0S3zXUGBmZnBAN+vvX4YDLzhvPJD+pZGASw5sAEjBfwbG+eiKmBj/O4LE/v1n3I8ux8jwP/Ep240FowZAwwAUCywsDAroAfWE9cYBXHJ//jA8AMUQPBqxGQBTJPNbAyOKUQwYjUYqJGVcmQmU1gllNHA0UgIAQUKgEaMrVmIAAAAASUVORK5CYII=";
		let screen9 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAOtJREFUOE/NU1sKgkAUPVfJaAe9oD7NTWQrqVZSrcRaSboJ89OgrB1Eht64IxMO+GdQ92s4MGfOYy6h5ZDc7z/cqW3D11xXJ9mPX67PjKlgREgvnSSsY0WB8N5LUkUwyt0VgwI5MxDenNNimHsBwKuKlPaZE68H+exIqB4i8Foe+g6BSCuYNoqZKcq68Xb49LZMPDew3AsYrGzZxDuxpRS0GUUgCkq2loqIcRYFVS5WpQBlJH7rmEXl4aPgP0LUFprkakyCBWEitgwLXwnxUyMolU/TWGOtWqPG34dYX6amxdGYKNV5GcvUJsQ3MorzEcNe+yUAAAAASUVORK5CYII=";
		let screen16 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAARVJREFUOE/NU0tOw0AMtT1SETeAwCLs0l6C5iSkJ2l7koSTUC4B3ZENnxsggsYP2WFEyCZUsCCbyZvM8/j5vXDWzUH902pEKUHWRKhsQxglQDmIa8Mg2j3P7sshhweANOKCA9dMtDQCE1aA5MRYpwKIWEngh89LabJAT+w7IOJGo26/FTh5LXL79HK8b21NOO2N8fCMcTjrFjUIXsT0nXVFpcRXhgNja2sEuwQG3z4d3W1Ou/nNjyX8egaTBazl1M7jbN+cvxdLs85bj7RzKaF3ZYxdVva22PgLa5sKqIoTVLXxPIj4JenMkDNp46SEPwjSl42eMpEKjMtko80j2SqEa5uDpbVPKrd8aHDGYTt4Bv/vZ/oAtpMSob5nDMgAAAAASUVORK5CYII=";
		let statusBar = document.createElement('div');
		statusBar.id = "mainStatusBar";
		statusBar.style.width = "100%";
		statusBar.style.height = "20px";
		statusBar.style.background = "rgba(255,255,255,0.2)";
		statusBar.style.position = "absolute";
		statusBar.style.bottom = "0px";
		statusBar.style.left = "0px";
		//statusBar.style.padding = "0px";
		statusBar.style.display = "flex";
		statusBar.style.justifyContent = "flex-end";
		statusBar.style.alignItems = "center";
		statusBar.innerHTML = "&nbsp;<img src='" + screen1 + "' width=16 height=16 alt='1x1' title='1x1' onclick='VideoWallUI.LayoutScreens(1)'>";
		statusBar.innerHTML += "&nbsp;<img src='" + screen4 + "' width=16 height=16 alt='2x2' title='2x2' onclick='VideoWallUI.LayoutScreens(4)'>";
		statusBar.innerHTML += "&nbsp;<img src='" + screen9 + "' width=16 height=16 alt='3x3' title='3x3' onclick='VideoWallUI.LayoutScreens(9)'>";
		statusBar.innerHTML += "&nbsp;<img src='" + screen16 + "' width=14 height=14 alt='4x4' title='4x4' onclick='VideoWallUI.LayoutScreens(16)'>";
		statusBar.innerHTML += "&nbsp;<img src='" + fullScreen + "' width=16 height=16 alt='全屏' title='全屏' onclick='VideoWallUI.fullScreen()'>&nbsp;";
		this.Container.append(statusBar);
	}

	static ContainsScreen(num) {
		let screens = [1, 4, 9, 16];
		for (let i = 0; i < screens.length; i++) {
			if (screens[i] == num) {
				return true;
			}
		}
		return false;
	}

	static LayoutScreens(num) {
		if (num == undefined) {
			console.log("LayoutScreens num is undefined");
		} else if (!VideoWallUI.ContainsScreen(num)) {
			console.log("LayoutScreens num is not in  [1, 4, 9, 16]");
			return;
		} else {
			this.ScreenNumber = num;
		}

		//console.log(this.Container)
		for (let i = 1; i <= this.Container.childElementCount; i++) {
			let videoContainer = this.Container.childNodes.item(i - 1);
			//console.log("videoContainer"+i,videoContainer)
			if (videoContainer.id == "mainStatusBar") {
				continue;
			}
			videoContainer.index = i;
			videoContainer.style.margin = "1px";
			videoContainer.parentContainer = this.Container;
			videoContainer.onclick = function() {
				VideoWallUI.SelectVideoIndex = this.index;
				//alert(VideoWallUI.SelectVideoIndex);
				VideoWallUI.SetSelectedScreen(videoContainer.childNodes.item(0));
				for (let j = 1; j <= this.parentContainer.childElementCount; j++) {
					if (j === VideoWallUI.SelectVideoIndex) {
						this.style.border = "1px solid #00FF00";
					} else {
						this.parentContainer.childNodes.item(j - 1).style.border = "1px solid black";
					}
				}
			};
			if (this.ScreenNumber < i) {
				videoContainer.style.display = "none";
			} else {
				videoContainer.style.display = "block";
			}
		}
		this.LayoutResize();
	}

	static LayoutResize() {
		let width = this.Container.clientWidth;
		let height = this.Container.clientHeight - 20; //扣除mainStatusBar的高度
		let count = 0;
		let videoContainerArray = Array.from(this.Container.childNodes).filter(item => item.id !== "mainStatusBar"); // 过滤掉mainStatusBar
		videoContainerArray.forEach(function(videoContainer) {
			if (VideoWallUI.ScreenNumber == 1 && videoContainer.index == 1) {
				videoContainer.style.width = (width - 4) + "px";
				videoContainer.style.height = (height - 4) + "px";
				count++;
			} else if (VideoWallUI.ScreenNumber == 4 && videoContainer.index <= 4) {
				videoContainer.style.width = (width / 2 - 4) + "px";
				videoContainer.style.height = (height / 2 - 4) + "px";
				count++;
			} else if (VideoWallUI.ScreenNumber == 9 && videoContainer.index <= 9) {
				videoContainer.style.width = (width / 3 - 4) + "px";
				videoContainer.style.height = (height / 3 - 4) + "px";
				count++;
			} else if (VideoWallUI.ScreenNumber == 16 && videoContainer.index <= 16) {
				videoContainer.style.width = (width / 4 - 4) + "px";
				videoContainer.style.height = (height / 4 - 4) + "px";
				videoContainer.style.cssFloat = "left";
				videoContainer.style.margin = "1px";
				count++;
			}
			if (count == VideoWallUI.ScreenNumber) {
				//break;
			}
		});
	}

	static fullScreen() {
		if (!document.webkitIsFullScreen) {
			this.Container.webkitRequestFullScreen(); //全屏
			//player.style.width = "100%"
		} else {
			document.webkitCancelFullScreen();
		}
	}
}