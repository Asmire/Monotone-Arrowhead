function vsubtract(a,b){
  return [a[0]-b[0],a[1]-b[1]];
}

function euclidean_metric(v){
  return Math.sqrt(v[0]*v[0]+v[1]*v[1]);
}


function pointBetween(a, b, distFromB) {
  var d, len, normalized;
  d = vsubtract(a, b);
  len = euclidean_metric(d);
  normalized = [d[0] / len, d[1] / len];
  return [b[0] + distFromB * normalized[0], b[1] + distFromB * normalized[1]];
}


function perpendicularSegment(a, b, length, p) {
  var d, u, v, vnorm;
  v = [b[0] - a[0], b[1] - a[1]];
  vnorm = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  u = [v[0] / vnorm, v[1] / vnorm];
  u = [-u[1], u[0]];
  d = [u[0] * length / 2, u[1] * length / 2];
  return [[+p[0] + d[0], +p[1] + d[1]], [+p[0] - d[0], +p[1] - d[1]]];
}



function MaPoints(origin, dest,k ) {
  var a, b, p0, p1, p2, p3, p4, p_, len, gap ,v;

  a = origin; b = dest;
  v = [b[0]-a[0],b[1]-a[1]];
  dist = euclidean_metric(v)/9;
  pt_0 = perpendicularSegment(a,b,dist*1.5*k,a)[1];
  pt_1 = perpendicularSegment(a,b,dist*6*k,a)[1];
  pt_2 = perpendicularSegment(a,b,dist*1*k,a)[1];
  pt_3 = perpendicularSegment(a,b,dist*3*k,a)[1];
  p1 = pointBetween(pt_1,b,dist*0.5);
  p2 = pointBetween(pt_3,b,dist*0.4);
  console.log(p1);
  return [ a, b, p1, p2 ,pt_2, pt_0]
}

function MaPath(origin, dest, k) {
  var p = MaPoints(origin, dest, k);
  return (
    'M' + p[0][0] + ',' + p[0][1] + ' C' + p[4][0] + ',' + p[4][1] + ' ' + p[4][0] + ',' + p[4][1] + ' ' + p[1][0] + ',' + p[1][1] +
    ' L' + p[2][0] + ',' + p[2][1] + ' L' + p[3][0] + ',' + p[3][1] + ' C' + p[5][0] + ',' +p[5][1] + ' ' + p[5][0] + ',' + p[5][1] + ' ' + p[0][0] + ',' + p[0][1]
  );
}
