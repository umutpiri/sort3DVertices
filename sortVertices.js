function getAngle(v1, v2){
    var dotproduct = v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
    var mag_v1 = Math.sqrt(v1.x*v1.x + v1.y*v1.y + v1.z*v1.z);
    var mag_v2 = Math.sqrt(v2.x*v2.x + v2.y*v2.y + v2.z*v2.z);
    var cosTheta = dotproduct/(mag_v1*mag_v2);
    return Math.acos(cosTheta);
}

function getNearest(v, vertices){
    var min = 100;
    var minindex = 0;
    for(i=0; i<vertices.length; i++){
        if(vertices[i].x == null)
            continue;
        var angle = getAngle(v, vertices[i]);
        if(angle < min){
            min = angle;
            minindex = i;
        }
    }
    return minindex;
}

function centerize(vertices){
    var mean = {}
    var x = 0;
    var y = 0;
    var z = 0;
    vertices.forEach(vertice => {
        x+=vertice.x;
        y+=vertice.y;
        z+=vertice.z;
    });
    mean['x'] = x/vertices.length;
    mean['y'] = y/vertices.length;
    mean['z'] = z/vertices.length;

    vertices.forEach(vertice => {
        vertice['x'] -= mean.x;
        vertice['y'] -= mean.y;
        vertice['z'] -= mean.z;
    });

}

function sortVertices(vertices){
    var vertices_copy = JSON.parse(JSON.stringify(vertices));
    centerize(vertices_copy);
    var starting_index = 0
    var current = JSON.parse(JSON.stringify(vertices_copy[starting_index]));
    var selected = [starting_index];
    vertices_copy[starting_index]['x'] = null
    for(var i=1; i<vertices_copy.length; i++){
        var nearest = getNearest(current, vertices_copy);
        current = JSON.parse(JSON.stringify(vertices_copy[nearest]));
        vertices_copy[nearest]['x'] = null;
        selected.push(nearest);
    }
    return selected;
}