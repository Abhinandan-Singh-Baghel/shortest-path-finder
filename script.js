var len = 10;



var wall = 'rgb(255, 255, 255)';
var original = 'rgb(52, 52, 52)';
var path = '#fce303';

function setup()
{
    // maze container
    var maze_container = document.getElementById('maze_container');

    
    
    for(var i= 0 ; i<10;i++){

    
        var row = document.createElement('div');
        row.className = 'row row' + (i+1);
        row.id = 'row' + (i+1) ;


        
         for(var j = 0;j<10;j++)
     {
        var node = document.createElement('div');
        node.className = 'node node' + ((i*10)+(j+1));
        node.id = 'node' + ((i*10)+(j+1));
        
       if(((i*10)+(j+1)) != 1 &&  ((i*10)+(j+1)) != 100 )
       {
           node.style.backgroundColor = original;

           node.onclick = function(){                     //the biggest problem
                clicked(this.id);
           };
       }


        row.appendChild(node);
    
      }
    maze_container.appendChild(row);
                        

         }

}

//end of the setup

function clicked(elementID)                               //the biggest error is that whenever we are cliking any node , since at start all the nodes are original in color so because this function was called the value becomes wall but this function is sort of not linked with all other functions so even though this has turned into wall the change has not been realized also this can only be called once so when we are clicking on the wall again it doesn't become original
                                                   //   So for the solution we need to link this function with the other functions or else write the logic of this inside the setup function only 
                                               // This problem may be because of the version 
{
    var node = document.getElementById(elementID);

    if(node.style.backgroundColor == wall)
    {
        node.style.backgroundColor = original;

    }
    else{
        node.style.backgroundColor = wall;
    }
}


function reset(){
    for(var i = 2;i<100;i++){
        var node = document.getElementById('node' + i);

        node.style.backgroundColor = original;
    }

    document.getElementById('node1').style.backgroundColor = 'rgb(255,38,38)';
    document.getElementById('node100').style.backgroundColor = 'rgb(236,0,177)';
    
}



function solveMaze(){

    var maze = [];

    for(let i = 0;i<len;i++){
        maze[i] = new Array(len).fill(0);

    }

    var rowCount = 0;
    var colCount = 0;
    var nodeVal = 1;

    for(var i = 1;i < (len*len+1);i++){                             //error may be here
        if(document.getElementById('node'+ i).style.backgroundColor == wall){
            maze[rowCount][colCount] = -1;                      //definitely error is here

        }
        else{
            maze[rowCount][colCount] = nodeVal;
        }

        colCount++;

        if(colCount == len){
            rowCount++;
            colCount = 0;

        }
        nodeVal++;
    }
   console.log(maze);
 // maze[1][0]=-1;

    var adjList = {};

    var possibleMoves = [  //error may be here

        [-1,0],
        [1,0],
        [0,1],
        [0,-1]
    ];

    for(var row = 0; row<maze.length;row++){
        for(var col = 0;col<maze[row].length;col++){
            if(maze[row][col] == -1){
                continue;
            }

            var currNode = maze[row][col];
            var neighbours = [];
            
            for(var count = 0; count< possibleMoves.length;count++){   // error may be here

                var nRow = possibleMoves[count][0] + row;
                var nCol = possibleMoves[count][1] + col;


                if((nRow >= 0 && nRow < maze.length) && (nCol>= 0 && nCol < maze[0].length)){

                    if(maze[nRow][nCol] != -1){
                        neighbours.push([nRow,nCol]);
                    }
                }



            }
         
            adjList[currNode] = neighbours;

        }
    }
   // This is where things get interesting 

   var visited = [];
   var prev = new Array(len*len).fill(0);

   for(var i = 0; i<len; i++){
       visited[i] = new Array(len).fill(false);
   }

   var queue = [];

   var solved = false;

   queue.push([0,0]);

   while(queue.length > 0){                        //error is in the while loop
       var nodeCoor = queue.splice(0,1)[0];
       var node = maze[nodeCoor[0]][nodeCoor[1]];

       visited[nodeCoor[0]][nodeCoor[1]] = true;

       if(node == 100){  
        solved = true;
           break;
        }

       var adj = adjList[node];

       for(var count = 0;count <adj.length; count++){
           var n = adj[count];

           if(!visited[n[0]][n[1]]){

            visited[n[0]][n[1]] = true;
            queue.push(n);
           prev[(maze[n[0]][n[1]]) - 1] = node - 1;
           }
           
       }

   }

  if(!solved){
      alert("This is impossible, I am going to reset the maze ");
      reset();
      return "";
  }



// Retracing



var endNode = maze[9][9];

document.getElementById('node'+ endNode).style.backgroundColor = path;

var previous = endNode - 1   ;   // Might be having some error
var loopControl = false;

while(true){
    var node = prev[previous];

    try{
        document.getElementById('node'+ (node + 1)).style.backgroundColor = path;

    }catch(err){
        loopControl = true;
    }

    if(node == 0){
        loopControl = true;

    }
    else{
        previous = node;

    }

    if(loopControl){
        break;
    }

}

document.getElementById('node1').style.backgroundColor = path;

}



