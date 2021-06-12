/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controller.js":
/*!***************************!*\
  !*** ./src/Controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/View.js\");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Model */ \"./src/Model.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar Controller = /*#__PURE__*/function () {\n  function Controller(view, model) {\n    _classCallCheck(this, Controller);\n\n    this.view = view;\n    this.model = model;\n  }\n\n  _createClass(Controller, [{\n    key: \"handleStartGame\",\n    value: function handleStartGame() {\n      var inputValue = this.view.playerNameInput.value;\n      var regex = /[a-zA-Z]+/g;\n      var gameState = this.model.gameState;\n      var _this$view = this.view,\n          setMessage = _this$view.setMessage,\n          clearMessage = _this$view.clearMessage;\n\n      if (!regex.test(inputValue)) {\n        setMessage('warning', 'Please enter your name!');\n        gameState.message = true;\n        return false;\n      }\n\n      gameState.playerName = inputValue;\n\n      if (gameState.message) {\n        gameState.message = false;\n        clearMessage();\n      }\n    }\n  }, {\n    key: \"setGamePlayLevel\",\n    value: function setGamePlayLevel() {\n      var _this = this;\n\n      var levelButtons = this.view.difficultyLevelButtons;\n      levelButtons.forEach(function (button) {\n        return button.addEventListener('click', function (e) {\n          var id = e.target.id;\n          _this.model.gameState.gameplayLevel = id;\n        });\n      });\n    }\n  }, {\n    key: \"initFunctions\",\n    value: function initFunctions() {\n      var _this2 = this;\n\n      this.setGamePlayLevel();\n      this.view.startGameButton.addEventListener('click', function () {\n        return _this2.handleStartGame();\n      });\n    }\n  }]);\n\n  return Controller;\n}();\n\nvar app = new Controller(new _View__WEBPACK_IMPORTED_MODULE_0__.default(), new _Model__WEBPACK_IMPORTED_MODULE_1__.default());\napp.initFunctions();\n\n//# sourceURL=webpack://JavaScriptReflexGame/./src/Controller.js?");

/***/ }),

/***/ "./src/Model.js":
/*!**********************!*\
  !*** ./src/Model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Model = function Model() {\n  _classCallCheck(this, Model);\n\n  // default state for each game\n  this.gameState = {\n    timeToFinishGame: 0,\n    squareHighlightTime: 2000,\n    gameTimeDuration: 60 * 1000,\n    playerName: null,\n    playerPoints: 0,\n    playerLifes: 3,\n    gameplayLevel: 'easy-level',\n    message: false\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);\n\n//# sourceURL=webpack://JavaScriptReflexGame/./src/Model.js?");

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar View = /*#__PURE__*/function () {\n  function View() {\n    _classCallCheck(this, View);\n\n    this.root = document.querySelector('#root');\n    this.playerNameInput = document.querySelector('.player_input');\n    this.difficultyLevelButtons = document.querySelectorAll('input[data-id=\"gameplay-level\"]');\n    this.startGameButton = document.querySelector('#start_game_button'); // this.infoBox = document.querySelector('#info-box');\n  }\n\n  _createClass(View, [{\n    key: \"setMessage\",\n    value: function setMessage(type, text) {\n      var infoBox = document.querySelector('#info-box');\n      var alert = \"\\n      <div class=\\\"alert alert-\".concat(type, \" alert-dismissible fade show\\\" role=\\\"alert\\\">\\n        \").concat(text, \"\\n        <button type=\\\"button\\\" class=\\\"btn-close\\\" data-bs-dismiss=\\\"alert\\\" aria-label=\\\"Close\\\"></button>\\n      </div>\\n    \");\n      console.log(infoBox);\n      infoBox.insertAdjacentHTML('afterbegin', alert);\n    }\n  }, {\n    key: \"clearMessage\",\n    value: function clearMessage() {\n      var infoBox = document.querySelector('#info-box');\n      var alertBox = document.querySelector('#info-box > .alert');\n      infoBox.removeChild(alertBox);\n    }\n  }]);\n\n  return View;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);\n\n//# sourceURL=webpack://JavaScriptReflexGame/./src/View.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Controller.js");
/******/ 	
/******/ })()
;