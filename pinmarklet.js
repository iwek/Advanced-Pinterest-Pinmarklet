(function (k, o, p, l) {
  var a = k[l.k] = {
    w: k,
    d: o,
    n: p,
    a: l,
    s: {},
    f: function () {
      return {
        callback: [],
        kill: function (b) {
          b.parentNode && b.parentNode.removeChild(b)
        },
        get: function (b, c) {
          var e = null;
          return e = b[c] || b.getAttribute(c)
        },
        make: function (b) {
          var c = false,
            e, d;
          for (e in b) if (b[e].hasOwnProperty) {
            c = a.d.createElement(e);
            for (d in b[e]) if (b[e][d].hasOwnProperty) if (typeof b[e][d] === "string") c[d] = b[e][d];
            break
          }
          return c
        },
        listen: function (b, c, e) {
          if (typeof a.w.addEventListener !== "undefined") b.addEventListener(c, e, false);
          else typeof a.w.attachEvent !== "undefined" && b.attachEvent("on" + c, e)
        },
        getSelection: function () {
          return ("" + (a.w.getSelection ? a.w.getSelection() : a.d.getSelection ? a.d.getSelection() : a.d.selection.createRange().text)).replace(/(^\s+|\s+$)/g, "")
        },
        pin: function (b) {
          var c = b.getElementsByTagName("IMG")[0],
            e = "false",
            d = a.a.pin + "?",
            f = (new Date).getTime();
          if (b.rel === "video") e = "true";
          d = d + "media=" + encodeURIComponent(c.src);
          d = d + "&url=" + encodeURIComponent(a.s.ii.value  || a.d.URL);
          d = d + "&title=" + encodeURIComponent(a.d.title);
          d = d + "&is_video=" + e;
          d = d + "&description=" + encodeURIComponent(a.v.selectedText || c.title || c.alt);
          a.v.hazIOS && a.w.setTimeout(function () {
            a.w.location = "pinit12:" + d
          }, 25);
          a.w.open(d, "pin" + f, a.a.pop)
        },
        close: function (b) {
          if (a.s.bg) {
            a.d.b.removeChild(a.s.shim);
            a.d.b.removeChild(a.s.bg);
            a.d.b.removeChild(a.s.bd)
          }
          k.hazPinningNow = false;
          b && a.w.alert(b);
          a.v.hazGoodUrl = false;
          a.w.scroll(0, a.v.saveScrollTop)
        },
        click: function (b) {
          b = b || a.w.event;
          var c = null;
          if (c = b.target ? b.target.nodeType === 3 ? b.target.parentNode : b.target : b.srcElement) if (c === a.s.x) a.f.close();
          else if (c.parentNode.className === a.a.k + "_pinContainer" || c.className === a.a.k + "_pinButton") {
            a.f.pin(c.parentNode.getElementsByTagName("A")[0]);
            a.w.setTimeout(function () {
              a.f.close()
            }, 10)
          }
        },
        behavior: function () {
          a.f.listen(a.s.bd, "click", a.f.click)
        },
        presentation: function () {
          var b = a.f.make({
            STYLE: {
              type: "text/css"
            }
          }),
            c = a.a.rules.join("\n").replace(/#_/g, "#" + l.k + "_").replace(/\._/g, "." + l.k + "_");
          if (b.styleSheet) b.styleSheet.cssText = c;
          else b.appendChild(a.d.createTextNode(c));
          a.d.h.appendChild(b)
        },
        thumb: function (b, c, e, d, f, g) {
          if (a.v.hazSrc[b] !== true) a.v.hazSrc[b] = true;
          else if (!a.v.hazIE) return;
          a.v.hazAtLeastOneGoodThumb = true;
          d || (d = "image");
          var h = a.f.make({
            SPAN: {
              className: a.a.k + "_pinContainer"
            }
          }),
            j = a.f.make({
              A: {
                rel: d
              }
            }),
            i = new Image,
            m, n;
          i.setAttribute("nopin", "nopin");
          i.style.visibility = "";
          if (f) i.title = f;
          g && i.setAttribute("url", g);
          i.onload = function () {
            m = this.width;
            n = this.height;
            this.style.marginTop = n < a.a.thumbCellSize ? -n / 2 + "px" : "-" + a.a.thumbCellSize / 2 + "px";
            this.style.marginLeft = m < a.a.thumbCellSize ? -m / 2 + "px" : "-" + a.a.thumbCellSize / 2 + "px";
            this.style.visibility = ""
          };
          i.src = b;
          j.appendChild(i);
          if (d !== "image") {
            b = a.f.make({
              B: {}
            });
            j.appendChild(b)
          }
          c = a.f.make({
            CITE: {
              innerHTML: c + " x " + e
            }
          });
          j.appendChild(c);
          h.appendChild(j);
          h.appendChild(a.f.make({
            SPAN: {
              className: a.a.k + "_pinButton"
            }
          }));
          if (d !== "image")(d = a.s.bd.getElementsByTagName("SPAN")[1]) ? d.parentNode.insertBefore(h, d) : a.s.bd.appendChild(h);
          else a.s.bd.appendChild(h)
        },
        call: function (b, c) {
          var e = a.a.k + ".f.callback[" + a.f.callback.length + "]",
            d = a.d.createElement("SCRIPT");
          a.f.callback.push(function (f) {
            c(f);
            a.f.kill(e)
          });
          d.id = e;
          d.src = b + e;
          d.type = "text/javascript";
          d.charset = "utf-8";
          a.v.firstScript.parentNode.insertBefore(d, a.v.firstScript)
        },
        ping: {
          check: function (b) {
            b && b.ok === false && a.f.close(a.a.msg.noPin)
          },
          vimeo: function (b) {
            var c;
            if (b[0] && b[0].thumbnail_large && b[0].embed_privacy === "anywhere") {
              c = "";
              if (b[0].title) c += b[0].title;
              if (b[0].user_name) c = c + ". Video by " + b[0].user_name;
              if (b[0].user_description) c = c + ". " + b[0].user_description;
              c += ".";
              a.f.thumb(b[0].thumbnail_large, 150, 200, "video", c, b[0].url)
            }
          }
        },
        hazUrl: {
          vimeo: function () {
            var b = a.d.URL.split("/").pop(),
              c = a.d.getElementsByTagName("LI"),
              e = a.d.getElementsByTagName("A"),
              d, f;
            b = parseInt(b, 10);
            if (b > 1 && a.v.hazCalledForThumb["_" + b] !== true) {
              a.f.call("http://vimeo.com/api/v2/video/" + b + ".json?callback=", a.f.ping.vimeo);
              a.v.hazCalledForThumb["_" + b] = true
            }
            d = c.length;
            for (f = 0; f < d; f += 1) if (c[f].id && c[f].id.split("clip_")[1]) {
              b = c[f].id.split("clip_")[1];
              b = parseInt(b, 10);
              if (b > 1 && a.v.hazCalledForThumb["_" + b] !== true) {
                a.v.hazCalledForThumb["_" + b] = true;
                a.f.call("http://vimeo.com/api/v2/video/" + b + ".json?callback=", a.f.ping.vimeo)
              }
            }
            d = e.length;
            for (f = 0; f < d; f += 1) if (e && e[f].href) {
              b = parseInt(e[f].href.split("/").pop(), 10);
              if (b > 1 && a.v.hazCalledForThumb["_" + b] !== true) {
                a.f.call("http://vimeo.com/api/v2/video/" + b + ".json?callback=", a.f.ping.vimeo);
                a.v.hazCalledForThumb["_" + b] = true
              }
            }
          },
          pinterest: function () {
            a.f.close(a.a.msg.installed)
          },
          facebook: function () {
            a.f.close(a.a.msg.privateDomain.replace(/%privateDomain%/, "Facebook"))
          },
          googleReader: function () {
            a.f.close(a.a.msg.privateDomain.replace(/%privateDomain%/, "Google Reader"))
          },
          stumbleUpon: function () {
            var b = 0,
              c = a.a.stumbleFrame.length,
              e;
            for (b = 0; b < c; b += 1) if (e = a.d.getElementById(a.a.stumbleFrame[b])) {
              a.f.close();
              if (a.w.confirm(a.a.msg.bustFrame)) {
                a.d.location = e.src;
                a.w.open(e.src)
              }
              break
            }
          }
        },
        hazSite: {
          youtube: {
            iframe: function (b) {
              b = b.src.split("?")[0].split("&")[0].split("/");
              a.f.thumb("http://img.youtube.com/vi/" + b.pop() + "/0.jpg", 360, 480, "video")
            },
            video: function (b) {
              b.getAttribute("data-youtube-id") && a.f.thumb("http://img.youtube.com/vi/" + b.getAttribute("data-youtube-id") + "/0.jpg", 360, 480, "video")
            },
            embed: function (b) {
              var c = b.getAttribute("flashvars"),
                e = "";
              (e = c ? c.split("video_id=")[1].split("&")[0] : b.src.split("?")[0].split("&")[0].split("/").pop()) && a.f.thumb("http://img.youtube.com/vi/" + e + "/0.jpg", 360, 480, "video")
            },
            object: function (b) {
              b = b.getAttribute("data");
              var c = "";
              if (b) c = b.split("?")[0].split("&")[0].split("/").pop();
              c && a.f.thumb("http://img.youtube.com/vi/" + c + "/0.jpg", 360, 480, "video")
            }
          },
          vimeo: {
            iframe: function (b) {
              a.f.call("http://vimeo.com/api/v2/video/" + b.src.split("/").pop() + ".json?callback=", a.f.ping.vimeo)
            }
          }
        },
        hazTag: {
          img: function (b) {
            var c;
            if (!b.src.match(/^data/)) {
              c = new Image;
              c.src = b.src;
              c.height > a.a.minImgSize && c.width > a.a.minImgSize && a.f.thumb(c.src, c.height, c.width)
            }
          },
          meta: function (b) {
            b.name && b.name.toUpperCase() === "PINTEREST" && b.content && b.content.toUpperCase() === "NOPIN" && a.f.close(a.a.msg.noPin)
          }
        },
        checkTags: function () {
          var b, c, e, d, f, g, h, j, i;
          a.v.tag = [];
          b = 0;
          for (c = a.a.check.length; b < c; b += 1) {
            f = a.d.getElementsByTagName(a.a.check[b]);
            e = 0;
            for (d = f.length; e < d; e += 1) {
              g = f[e];
              !g.getAttribute("nopin") && g.style.display !== "none" && g.style.visibility !== "hidden" && a.v.tag.push(g)
            }
          }
          b = 0;
          for (c = a.v.tag.length; b < c; b += 1) {
            f = a.v.tag[b];
            g = f.tagName.toLowerCase();
            if (a.f.hazTag[g]) a.f.hazTag[g](f);
            else if (a.a.tag[g]) for (h in a.a.tag[g]) if (a.a.tag[g][h].hasOwnProperty) {
              j = a.a.tag[g][h];
              if (i = a.f.get(f, j.att)) {
                e = 0;
                for (d = j.match.length; e < d; e += 1) i.match(j.match[e]) && a.f.hazSite[h][g](f)
              }
            }
          }
        },
        structure: function () {
          a.s.shim = a.f.make({
            IFRAME: {
              height: "100%",
              width: "100%",
              allowTransparency: true,
              id: a.a.k + "_shim"
            }
          });
          a.s.shim.setAttribute("nopin", "nopin");
          a.d.b.appendChild(a.s.shim);
          a.s.bg = a.f.make({
            DIV: {
              id: a.a.k + "_bg"
            }
          });
          a.d.b.appendChild(a.s.bg);
          a.s.bd = a.f.make({
            DIV: {
              id: a.a.k + "_bd"
            }
          });
          a.s.x = a.f.make({
            A: {
              id: a.a.k + "_x",
              innerHTML: a.a.msg.cancelTitle
            }
          });
          a.s.idd = a.f.make({
            DIV: {
              id: "id_div"
            }
          });            
          a.s.il = a.f.make({
            LABEL: {
              id: "id_label",
              innerHTML: "Custom URL: "
            }
          });          
          a.s.ii = a.f.make({
            INPUT: {
              id: "id_url",
              name: "url",
              value: ""
            }
          });
          a.s.bd.appendChild(a.s.x);
          a.s.bd.appendChild(a.s.idd);
          a.s.idd.appendChild(a.s.il);
          a.s.idd.appendChild(a.s.ii);
          a.s.bd.appendChild(a.f.make({
            SPAN: {
              id: a.a.k + "_logo"
            }
          }));
          a.d.b.appendChild(a.s.bd);
          a.w.scroll(0, 0)
        },
        checkUrl: function () {
          var b;
          for (b in a.a.url) if (a.a.url[b].hasOwnProperty) if (a.d.URL.match(a.a.url[b])) {
            a.f.hazUrl[b]();
            if (a.v.hazGoodUrl === false) return false
          }
          return true
        },
        checkPage: function () {
          if (a.f.checkUrl()) {
            a.f.checkTags();
            if (a.v.hazGoodUrl === false) return false
          } else return false;
          return true
        },
        init: function () {
          a.d.b = a.d.getElementsByTagName("BODY")[0];
          a.d.h = a.d.getElementsByTagName("HEAD")[0];
          if (!(!a.d.b || !a.d.h || k.hazPinningNow === true)) {
            var b, c = a.n.userAgent;
            a.v = {
              saveScrollTop: a.w.pageYOffset,
              hazGoodUrl: true,
              hazAtLeastOneGoodThumb: false,
              hazSrc: {},
              hazCalledForThumb: {},
              hazIE: function () {
                return /msie/i.test(c) && !/opera/i.test(c)
              }(),
              hazIOS: function () {
                return c.match(/iP/) !== null
              }(),
              firstScript: a.d.getElementsByTagName("SCRIPT")[0],
              selectedText: a.f.getSelection()
            };
            b = a.a.checkpoint.url + "?url=" + encodeURIComponent(a.d.URL) + "&callback=";
            a.f.call(b, a.f.ping.check);
            a.f.structure();
            a.f.presentation();
            if (a.f.checkPage()) if (a.v.hazGoodUrl === true) {
              a.f.behavior();
              if (!(a.f.callback.length > 1)) if (a.v.hazAtLeastOneGoodThumb === false || a.v.tag.length === 0) {
                a.f.close(a.a.msg.notFound);
                return
              }
            }
            k.hazPinningNow = true
          }
        }
      }
    }()
  };
  a.f.init()
})(window, document, navigator, {
  k: "PIN_" + (new Date).getTime(),
  checkpoint: {
    url: "//api.pinterest.com/v2/domains/info/"
  },
  pin: "//pinterest.com/pin/create/bookmarklet/",
  minImgSize: 80,
  thumbCellSize: 200,
  check: ["meta", "iframe", "embed", "object", "img", "video"],
  url: {
    vimeo: /^https?:\/\/.*?\.?vimeo\.com\//,
    facebook: /^https?:\/\/.*?\.?facebook\.com\//,
    googleReader: /^https?:\/\/.*?\.?google\.com\/reader\//,
    pinterest: /^https?:\/\/.*?\.?pinterest\.com\//,
    stumbleUpon: /^https?:\/\/.*?\.?stumbleupon\.com\//
  },
  stumbleFrame: ["tb-stumble-frame", "stumbleFrame"],
  tag: {
    video: {
      youtube: {
        att: "src",
        match: [/videoplayback/]
      }
    },
    embed: {
      youtube: {
        att: "src",
        match: [/^http:\/\/s\.ytimg\.com\/yt/, /^http:\/\/.*?\.?youtube-nocookie\.com\/v/]
      }
    },
    iframe: {
      youtube: {
        att: "src",
        match: [/^http:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9\-_]+)/]
      },
      vimeo: {
        att: "src",
        match: [/^http?s:\/\/vimeo.com\/(\d+)/, /^http:\/\/player\.vimeo\.com\/video\/(\d+)/]
      }
    },
    object: {
      youtube: {
        att: "data",
        match: [/^http:\/\/.*?\.?youtube-nocookie\.com\/v/]
      }
    }
  },
  msg: {
    check: "",
    cancelTitle: "Cancel Pin",
    bustFrame: "We need to remove the StumbleUpon toolbar before you can pin anything. Click OK to do this or Cancel to stay here.",
    noPin: "This site doesn't allow pinning to Pinterest. Please contact the owner with any questions. Thanks for visiting!",
    privateDomain: "Sorry, can't pin directly from %privateDomain%.",
    notFound: "Sorry, couldn't find any large images or video on this page.",
    installed: "The bookmarklet is installed! Now you can click your Pin It button to pin images as you browse sites around the web."
  },
  pop: "status=no,resizable=no,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=632,height=270,left=0,top=0",
  rules: ["#_bg {position:fixed;z-index:8675309; top:0; right:0; bottom:0; left:0; background-color:#f2f2f2; opacity:.95; }", "#_shim {position:fixed; background: transparent; z-index:8675308; top:0; right:0; bottom:0; left:0; }", "#_bd {position: absolute; text-align: left; padding-top: 36px; top: 0; left: 0; right: 0; z-index:8675320; font:16px hevetica neue,arial,san-serif; }", "#_bd span { zoom:1; display: inline-block; background: #fff; height:200px; width:200px; border: 1px solid #ddd; border-top: none; border-left:none; text-decoration: none;  text-shadow: 0 1px #fff; position: relative; cursor: pointer; vertical-align:middle;  }", "#_bd span#_logo {background: #FCF9F9 url(http://d3io1k5o0zdpqr.cloudfront.net/images/about/LogoAbout.png) 50% 50% no-repeat; box-shadow: none; }", '#_bd a#_x, #_bd div {height: 36px; line-height: 36px; position: fixed; font-size: 14px; font-weight: bold; display: block; width:auto; top: 0; left: 0; right: 0; margin: 0; background: url("http://d3io1k5o0zdpqr.cloudfront.net/images/fullGradient07Normal.png") repeat-x scroll 0 0 #FFFFFF; border-bottom: 1px solid #CCCCCC; color: #211922; text-align: center; z-index:8675321; }', '#_bd div {top: 36px;}', '#_bd a#_x:active {background-color: #211922; background-image: url("http://d3io1k5o0zdpqr.cloudfront.net/images/fullGradient07Inverted.png"); border-color: #211922; text-shadow: 0 -1px #211922; }', "#_bd a#_x:hover {color: #fff; text-decoration: none; background-color: #1389e5; border-color: #1389e5; text-shadow: 0 -1px #46A0E6;}", "#_bd a img {max-height:200px; max-width:200px; top: 50%; left: 50%; position: absolute; z-index:8675312; }", "#_bd a b { z-index: 8675315; position: absolute; top: 50%; left: 50%; height: 50px; width: 50px; background: transparent url(http://d3io1k5o0zdpqr.cloudfront.net/images/VideoIndicator.png) 0 0 no-repeat; margin-top: -25px; margin-left: -25px; }", "#_bd a cite {z-index: 8675316; position: absolute; font-size: 10px; font-style: normal; bottom: 5px; width: 100px; left: 50%; margin-left: -50px; text-align: center; color: #000; background: #fff; padding: 3px;}", "#_bd span._pinContainer {z-index: 8675320; height: 200px; width: 200px; background: #fff; }", "#_bd span._pinButton {z-index: 8675320; height: 200px; width: 200px; background: transparent; }", "#_bd span._pinButton:hover {height: 200px; width: 200px; background: transparent url(http://d3io1k5o0zdpqr.cloudfront.net/images/PinThis.png) 50% 50% no-repeat; }"]
});