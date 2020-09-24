import React, { useEffect } from 'react';

function MicroFrontend({ name, host, ...rest }) {
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    const renderMicroFrontend = () => {
      window[`render${name}`](`${name}-container`, rest);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement('script');

        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest.files['main.js']}`;
        script.onload = () => {
          renderMicroFrontend();
        };
        document.head.appendChild(script);

        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = `${host}${manifest.files['main.css']}`;

        document.head.appendChild(styles);
      });

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  });

  return <main id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
