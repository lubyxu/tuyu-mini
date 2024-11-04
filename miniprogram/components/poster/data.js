export const getData = ({
  time,
  photos,
  description,
}) => {
  return {
    "width": "310px",
    "height": "440px",
    "background": "#f8f8f8",
    "borderRadius": "8px",
    "views": [
      {
        "type": "image",
        "url": "https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/gulou/gege/share-bg.png",
        "css": {
          "width": "310px",
          "height": "440px",
          "top": "0px",
          "left": "0px",
          "rotate": "0",
          "borderRadius": "",
          "borderWidth": "",
          "borderColor": "#000000",
          "shadow": "",
          "mode": "scaleToFill"
        }
      },
      {
        "type": "text",
        "text": time,
        "css": {
          "color": "#000000",
          "width": "80px",
          "height": "48.62px",
          "top": "33px",
          "left": "36px",
          "rotate": "-5.7",
          "borderRadius": "",
          "borderWidth": "",
          "borderColor": "#000000",
          "shadow": "",
          "padding": "0px",
          "fontSize": "34px",
          "fontWeight": "normal",
          "maxLines": "2",
          "lineHeight": "49px",
          "textStyle": "fill",
          "textDecoration": "none",
          "textAlign": "left"
        }
      },
      {
        "type": "image",
        "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/common/poster-logo.png?sign=4d870644a8ed2de57fb176687d4ac125&t=1727421568",
        "css": {
          "width": "100px",
          "height": "50px",
          "top": "13px",
          "left": "140px",
          "rotate": "0",
          "borderRadius": "",
          "borderWidth": "",
          "borderColor": "#000000",
          "shadow": "",
          "mode": "scaleToFill"
        }
      },
      {
        "type": "image",
        "url": photos[0]?.url,
        "css": {
          "width": "198px",
          "height": "260px",
          "top": "64px",
          "left": "51px",
          "rotate": "-5.7",
          "borderRadius": "5px",
          "borderWidth": "",
          "borderColor": "#000000",
          "shadow": "",
          "mode": "scaleToFill"
        }
      },
      {
        "type": "image",
        "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/common/qrcodee.png?sign=66a087fc0ee7df982c51ea62bdc34889&t=1727665669",
        "css": {
          "width": "60px",
          "height": "60px",
          "borderRadius": "5px",
          "top": "345px",
          "left": "68px",
        }
      },
      {
        "type": "text",
        "text": description[0],
        "css": {
          "color": "#000000",
          "width": "300px",
          "height": "48.62px",
          "top": "337px",
          "left": "132px",
          "rotate": "-5.7",
          "fontSize": "14px",
          "fontFamily": "FZKai-Z03S"
        }
      },
      {
        "type": "text",
        "text": description?.[1],
        "css": {
          "color": "#000000",
          "width": "300px",
          "height": "48.62px",
          "top": "360px",
          "left": "132px",
          "rotate": "-5.7",
          "fontSize": "14px",
          "fontFamily": "FZKai-Z03S"
        }
      },
    ]
  }
}