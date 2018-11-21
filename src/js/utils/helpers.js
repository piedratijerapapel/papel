export function req(url) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();

    req.overrideMimeType('application/json');
    req.open('GET', url, true);

    req.onload = () => {
      if (req.status === 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject(req.statusText);
      }
    };

    req.send();
  });
}

export function mapNumber(num, inMin, inMax, outMin, outMax) {
  return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export function getParams(url) {
  let params = {};
  let vars = url.substring(1).split('&');

  vars.forEach(v => {
    var pair = v.split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  });

  return params;
};

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
