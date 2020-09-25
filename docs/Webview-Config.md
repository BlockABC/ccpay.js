# Webview

[English Version](./Webview-Config.md)
[中文版本](./Webview-Config.zh.md)

CCTip Box client provide configuration for Webview. Web App can configure the appearance of Webview. For now, we only provide configure in URL as below:

## _wv query
_wv query is a decimal number, where each bit of the binary form represents whether a function is enabled or disabled.

For example: ?_wv=41(101001 in binary) indicating the first, the forth, the sixth function is enabled

#### 详细参数
- `1` Enter the horizontal mode or not.
- `2` Enter fullscreen mode or not(With fullscreen mode, Status Bar, NavBar, Back Button, and title will be hidden, configuration for these elements will be ignored. Capsule button will be kept, and you can set its position)
- `4` Hide Navigation Bar or not.(Including Back Button and Title. `forecolor` and `backcolor` will not work for these elements. Capsule Button will be kept, and can be positioned)
- `8` Hide Status Bar or not.
- `16` Set Navigation Bar to Ghost Bar, which mean it will not take and place on the screen.
- `32` Hide title text or not. if it is hide, `forecolor` will not take effect.
- `64` Hide Back Button or not.

**Noted**： Params matches from top to bottom with its binary form lower to upper.

## URL Query
- `bgcolor`: Set Navigation Bar and Status Bar's background color. It support 2 formats like ffbbgg and ffbbggaa(alpha channel, with opacity level)

- `forecolor`: Set Navigation Bar and Status Bar's color. Only white(ffffff) and black(000000) are supported. It will take effect on Status Bar text, Back Button, Title and Close Button.

- `menuButtonPosition`: Set the position of Capsule button. 1/2/3/4，clockwise from top left，1 for left top，2 right top，3 for right bottom，5 for left bottom。
    > Noted：We currently limit that you can only set this query when you hide the Navigation Bar or enter Fullscreen mode, which means `_wv & 2 >0 || _wv & 4 > 0`

## Examples
#### Fullscreen, with Capsule Button on the left bottom of the screen
`xxx.html?_wv=2&menuButtonPosition=4`

#### Hide Status Bar and Title, and set Navigation Bar to red
`xxx.html?_wv=40&bgcolor=ff0000`
