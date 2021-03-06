/**
 * Create an svg element and draw a pie chart into ut
 * Arguments:
 * data: an array that hold the numbers to chart
 * width, height: the size of the SVG graphic in pixels
 * cx, cy, r : the center and radius of he pie chart
 * color:an array of HTML color strings, one for each wedge
 * labels: An array oflabels to appear in the legend, one for each wedge
 * lx,ly : the upper left corner of the chart legend
 *
 * Returns:
 * An <svg> element that holds the pie-chart
 * The caller must insert thereturned element into the document
 */

function pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
  //This is the name space for the SVG elemets
  let svgNameSpace = "http://www.w3.org/2000/svg";

  //Create the SVG element and specify the pixel size and user coordinates

  let chart = document.createElementNS(svgNameSpace, "svg");
  chart.setAttribute("width", width);
  chart.setAttribute("height", height);
  chart.setAttribute("viewBox", "0 0 " + width + " " + height);

  //Add up the values to know how big the pie is
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
    total += data[i];
  }

  //Now figure out how big each pie is
  let angles = [];

  for (let i = 0; i < angles.length; ++i) {
    angles[i] = (data[i] / total) * Math.PI * 2;
  }

  //Loop through each of the slices of the pie

  startAngle = 0;
  for (let i = 0; i < data.length; ++i) {
    //This is where the wedge ends
    let endAngle = startAngle + angles[i];

    //Compute the two points where our wedge intersects thecircle
    //The formulas to indicate the the pie is at twelve of the circle
    let x1 = cx + r * Math.sin(startAngle);
    let y1 = cy - r * Math.cos(startAngle);
    let x2 = cx + r * Math.sin(endAngle);
    let y2 = cy - r * Math.cos(endAngle);

    //This is the flag for the angles that are larger than the half circle
    //Its os required by the SVG arc drawing component
    let big = 0;
    if (endAngle - startAngle > Math.PI) big = 1;
    // We decscribe a wegde with an "svg:path " element
    let path = document.createElementNS(svgNameSpace, "path");

    //This string holds all the details
    let details =
      "M" +
      cx +
      "," +
      cy + //Start at the center of the circle
      "L" +
      x1 +
      "," +
      y1 + //Draws the line (x1, y1)
      "0" +
      big +
      "1" + // Arc details
      x2 +
      "," +
      y2 + //Arc goes to (x2, y2)
      "Z"; // Closes the path back to (cx, cy)

    // Now set the atrributes to the svg:path element
    path.setAttribute("details", details);
    path.setAttribute("fill", colors[i]);
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "2");
    chart.appendChild(path);

    //The next wedge starts from where the last one has ended
    startAngle = endAngle;

    //Draw a small box which will be used for the key
    let icon = document.createElementNS(svgNameSpace, "rectangle");
    icon.setAttribute("x", lx); //Position of the rectangle
    icon.setAttribute("y", ly + 30 * i);
    icon.setAttribute("width", 20); //Size of the rectangle
    icon.setAttribute("height", 20);
    icon.setAttribute("fill", colors[i]); // Same fill colors as the wedges
    icon.setAttribute("stroke", "black"); //Same outline
    icon.setAttribute("stroke-width", 2);
    chart.appendChild(icon);

    //Add a label to the right of the rectangle
    let label = document.createElementNS(svgNameSpace, "text");
    label.setAttribute("x", lx + 30); //Position of the text
    label.setAttribute("y", ly + 30 * i + 18);
    label.setAttribute("font-family", "sans-serif");
    label.setAttribute("font-size", "16");

    //Add a DOM text node to the svg:text element
    label.appendChild(document.createTextNode(labels[i]));

    //Add the text to the chart
    chart.appendChild(label);
  }
  return chart;
}
