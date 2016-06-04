(function () {
  var svg;
  var weather;
  document.addEventListener("DOMContentLoaded", onReady);

  function onReady(){
    var forecast = document.getElementById('forecast');
    forecast.addEventListener("load", function(){
      weather = new WeatherWidget(document.getElementById('forecast').contentDocument);
      var icons = Object.keys(weather.icon);
      var iconIndex = 0;
      switchIcon();

      function switchIcon() {
        console.log("Switch to icon "
          + icons[iconIndex]
          +" (idx: "
          + iconIndex
          +")"
        );
        weather.setIcon(weather.icon[icons[iconIndex]]);
        weather.setTemperatures(iconIndex,iconIndex);
        iconIndex >= (icons.length - 1) ? iconIndex = 0 : iconIndex++;
        window.setTimeout(switchIcon,10000); // timeout recursion
      };
    });
  }

  function WeatherWidget(svg) {
    var weatherIcon = svg.getElementById('weatherIcon');
    var minTemperature = svg.getElementById('minTemperature');
    var maxTemperature = svg.getElementById('maxTemperature');
    this.setIcon = setIcon;
    this.getIcon = getIcon;
    this.setTemperatures = setTemperatures;
    this.icon = {
      mostlyCloudy: '#bkn',
      blizzard: '#blizzard',
      cold: '#cold',
      dust: '#du',
      fewClouds: '#few',
      fog: '#fg',
      smoke: '#fu',
      freezingRain: '#fzra',
      rainShowersInVicinity: '#hi_shwrs',
      hot: '#hot',
      icePellets: '#ip',
      mix: '#mix',
      overcast: '#ovc',
      rain: '#ra',
      rainIcePellets: '#raip',
      rainSnow: '#rasn',
      partlyCloudy: '#sct',
      sctfg: '#sctfg',
      thunderstormInVicinity: '#scttsra',
      rainShowers: '#shra',
      clearSky: '#skc',
      snow: '#sn',
      thunderstormRain: '#tsra',
      wind: '#wind'
    };


    /**
     * setIcon - sets current weather icon
     *
     * @param  {String} iconId id of the icon from the svg file (xlink:href syntax)
     */
    function setIcon(iconId) {
      weatherIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', iconId);
    }


    /**
     * getIcon - retrieve id of current weather icon
     *
     * @return {String}  xlink:href syntax of current weather icon
     */
    function getIcon() {
      return weatherIcon.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    }


    /**
     * setTemperatures - update temperature info
     *
     * @param  {Number} min minimum temperature expected
     * @param  {Number} max maximum temperature expected
     */
    function setTemperatures(min, max) {
      setText(minTemperature,(0 - 5 - min).toFixed(0));
      setText(maxTemperature,(10 + max).toFixed(0));
      function setText(node,text) {
        var textNode = svg.createTextNode(text);
        if (node.firstChild !== null) {
          node.replaceChild(textNode, node.firstChild);
        } else {
          node.appendChild(textNode);
        }
      }
    }
  }

})()