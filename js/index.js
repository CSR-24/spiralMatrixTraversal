function start(){
  var M = $('#m').val(),
      N = $('#n').val();
  if(M && N && _.isNumber(parseInt(M)) && _.isNumber(parseInt(N)) && M >= 0 && N >= 0) {
    drawSpiralPath(findSpiral(M, N), N, M);
  }
}

function findSpiral(row, col) {
  // Setting boundaries
  var start1 = 0,
      end1 = col -1,
      start2 = 1,
      end2 = row -1,
      start3 = end1 - 1,
      end3 = start1,
      start4 = end2 - 1,
      end4 = start1 + 1,
      matrix = [],
      rank = 1,
      palleteIndex= 0,
      pallete = ['lightgreen', 'lightblue', 'lightgrey', 'lightcoral', 'lightcyan', 'lightseagreen'],
      nodeColor;

  while(true){
     nodeColor = pallete[palleteIndex];
     palleteIndex = (palleteIndex == pallete.length) ? 0 : (palleteIndex + 1);  
    
    //Traverse and check if goal is reached
    for(var x1 = start1; x1<=end1; x1++){
      matrix.push({c: x1, r: start1, rank: rank++, color: nodeColor});
    }
    if(matrix.length >= (col*row)){break;}
    
    //Traverse and check if goal is reached
    for(var y1 = start2; y1<=end2; y1++){
      matrix.push({c: end1, r: y1, rank: rank++, color: nodeColor});
    }
    if(matrix.length >= (col*row)){break;}
    
    //Traverse and check if goal is reached
    for(var x2 = start3; x2>=end3; x2--){
      matrix.push({c: x2, r: end2, rank: rank++, color: nodeColor});
    }
    if(matrix.length >= (col*row)){break;}
    
    //Traverse and check if goal is reached
    for(var y2 = start4; y2>=end4; y2--){
      matrix.push({c: start1, r: y2, rank: rank++, color: nodeColor});
    }
    if(matrix.length >= (col*row)){break;}

    //Dynamically adjusting bodundaries...
    start1++;
    end1--;
    start2++;
    end2--;
    start3 = end1 - 1;
    end3 = start1;
    start4 = end2 - 1;
    end4 = start1 + 1;
        
  }
  
  _.forEach(matrix, function(node, key) {
    console.log('('+node.c+','+node.r+')');
  });
  
  return matrix;
}

function drawSpiralPath(matrix, col, row) {

  $('#spiral').html('');
  
    _.forEach(_.sortBy(matrix, 'r', 'c'), function(node, key){
    var $ele = document.createElement('div'),
        $id = document.createAttribute('id'),
        width = Math.ceil(700/col),
        height = Math.ceil(700/row);
    $id.value = key;
    $ele.setAttributeNode($id);
   document.getElementById('spiral').appendChild($ele);
    $('#'+key).css('height', height);
    $('#'+key).css('width', width);
    $('#'+key).css('float', 'left');
    $('#'+key).css('border', '1px solid black');
    $('#'+key).css('padding', '1px');
    if(node.rank == 1){
      $('#'+key).css('background', 'green');
     }
    else if(node.rank == matrix.length){
      $('#'+key).css('background', 'red');
    }
    else {
      $('#'+key).css('background', node.color); 
    }
    $('#'+key).html("<h5 style='text-align: center'>"+node.rank+"</h5>");
  });
}