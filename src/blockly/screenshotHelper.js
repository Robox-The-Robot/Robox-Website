/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Download screenshot.
 * @author samelh@google.com (Sam El-Husseini)
 */
'use strict';

const ratio = 16/9;
const padding = 30;
const finalWidth = 230;

/**
 * Convert an SVG datauri into a PNG datauri.
 * @param {string} data SVG datauri.
 * @param {number} width Image width.
 * @param {number} height Image height.
 * @param {!Function} callback Callback.
 */
function svgToPng_(data, width, height, callback) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var img = new Image();

    var pixelDensity = finalWidth/width;
    canvas.width = width * pixelDensity;
    canvas.height = height * pixelDensity;
    img.onload = function () {
        context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        try {
            var dataUri = canvas.toDataURL('image/png');
            callback(dataUri);
        } catch (err) {
            console.warn('Error converting the workspace svg to a png');
            callback('');
        }
    };
    img.src = data;
}

/**
 * Create an SVG of the blocks on the workspace.
 * @param {!Blockly.WorkspaceSvg} workspace The workspace.
 * @param {!Function} callback Callback.
 * @param {string=} customCss Custom CSS to append to the SVG.
 */
function workspaceToSvg_(workspace, callback, customCss) {
    // Go through all text areas and set their value.
    var textAreas = document.getElementsByTagName("textarea");
    for (var i = 0; i < textAreas.length; i++) {
        textAreas[i].innerHTML = textAreas[i].value;
    }

    var bBox = workspace.getBlocksBoundingBox();
    var x = bBox.x || bBox.left;
    var y = bBox.y || bBox.top;
    var width = bBox.width || bBox.right - x;
    var height = bBox.height || bBox.bottom - y;

    if (width === 0 || height === 0) {
        width = 100;
        height = 100;
    }
    
    // Aspect ratio
    if (width>height) {
        y -= (width/ratio - height)/2;
        height = width / ratio;
    } else {
        x -= (height*ratio - width)/2;
        width = height * ratio;
    }

    var blockCanvas = workspace.getCanvas();
    
    var clone = blockCanvas.cloneNode(true);
    clone.removeAttribute('transform');

    // Add padding
    x -= padding;
    y -= padding;
    width += padding*2;
    height += padding*2;


    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    let patterns = workspace.getParentSvg().querySelectorAll("defs");
    for (let pattern of patterns) {
        svg.appendChild(pattern.cloneNode(true));
    }

    let patternId = patterns[0].firstChild.id;
    let bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('width', "200%");
    bgRect.setAttribute('height', "200%");
    bgRect.setAttribute('x', x);
    bgRect.setAttribute('y', y);
    bgRect.setAttribute("style", `fill: url("#${patternId}"); transform: translate(-24px, -16px);`);
    svg.appendChild(bgRect);

    svg.appendChild(clone);
    svg.setAttribute('viewBox', x + ' ' + y + ' ' + width + ' ' + height);

    svg.setAttribute('class', 'blocklySvg ' +
        (workspace.options.renderer || 'geras') + '-renderer ' +
        (workspace.getTheme ? workspace.getTheme().name + '-theme' : ''));
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute("style", 'background-color: #A1EEBD;');

    var css = [].slice.call(document.head.querySelectorAll('style'))
        .filter(function (el) {
            return /\.blocklySvg/.test(el.innerText) ||
                (el.id.indexOf('blockly-') === 0);
        }).map(function (el) {
            return el.innerText;
        }).join('\n');
    var style = document.createElement('style');
    style.innerHTML = css + '\n' + customCss;
    svg.insertBefore(style, svg.firstChild);

    var svgAsXML = (new XMLSerializer).serializeToString(svg);
    svgAsXML = svgAsXML.replace(/&nbsp/g, '&#160');
    var data = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);

    svgToPng_(data, width, height, callback);
}

export { workspaceToSvg_ }