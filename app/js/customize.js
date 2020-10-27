/*
 * コラッツ問題の計算を行う
 * @param  {Number} n 自然数
 * @return {Number}   計算結果
 */
function collatz(n) {
  if (n === 1)  {
    return;
  }
  if (n % 2 === 0) {
    return n / 2;
  } else {
    return (n * 3) + 1;
  }
}

/*
 * コラッツ問題の計算を逆から行う
 * @param  {Number} n 自然数
 * @return {Array}   計算結果
 */
function collatzReverseOrder(n) {
  var array = [];
  if (n !== 1) {
    if (((n - 1) / 3) % 2 === 1) {
      if ((n - 1) / 3 !== 1) {
        array.push((n - 1) / 3);
      }
    }
  }
  array.push(n * 2);
  return array;
}

/*
 * 1になるまで追加
 * @param  {Number} n 自然数
 */
function collatzRepeat(n) {
  nodeAdd(n);
  nodeAdd(collatzReverseOrder(n));
  while ( n !== 1 ) {
    n = collatz(n);
    nodeAdd(n);

    collatzReverseOrder(n).forEach(function(n) {
      nodeAdd(n);
    });
  }
}

/*
 * 選択したnodeから1になるまで追加するボタン
 */
function collatzRepeatButton() {
  if ( network.getSelectedNodes().length > 0 ) {
    var n = network.getSelectedNodes()[0];
    collatzRepeat(n);
  }
}

/*
 * すべてのnodeをクリア
 */
function nodeClear() {
  nodes.clear();
  edges.clear();
}

/*
 * nodeを追加する
 * @param  {Number} n 自然数
 */
function nodeAdd(n) {
  if (nodes.get(n)) {
    return; //登録済みのnodeは追加しない
  }

  nodes.add([{
    id: n,
    label: n.toString(10),
    group: getGroup(n,divide)
  }]);

  if (n !== 1) {
    edges.add([{
      id: n,
      from: String(n),
      to: String(collatz(n)),
      arrows: 'to'
    }]);
  }
}

/*
 * グループ分けをする
 */
function getGroup(n) {
  if (groupMode === 'mod') {
    return getGroupMod(n,divide);
  } else {
    return getGroupOdd(n);
  }
}


/*
 * nを割った余りを返す
 * @param  {Number} n 自然数
 * @param  {Number} d 除算
 */
function getGroupMod(n, d) {
  return String(n % d);
}

/*
 * 2で割り続けた際のたどり着く奇数を返す
 * @param  {Number} n 自然数
 */
 function getGroupOdd(n) {
  while ( n % 2 === 0 ) {
    n = n / 2;
  }
  return String(n);
}

/*
 * nodeを更新
* nで割った余りでグループ分けする
 */
function nodeUpdateGroupMod(d) {
  divide = d;
  groupMode = 'mod';
  nodes.getIds().forEach(function(n) {
    // 割った余りでグループを更新する
    nodes.update({
      id: n,
      label: n.toString(10),
      group: getGroupMod(n, divide)
    });
  });
}

/*
 * nodeを更新
 * 2で割り続けた際のたどり着く奇数の値でグループ分けする
 */
 function nodeUpdateGroupOdd() {
  groupMode = 'odd';
  nodes.getIds().forEach(function(n) {
    // 割った余りでグループを更新する
    nodes.update({
      id: n,
      label: n.toString(10),
      group: getGroupOdd(n)
    });
  });
}

/*
 * nodeを更新
 * n進法の表記に変換する
 *  * @param  {Number} bn 基数
 */
function nodeUpdateLabelbaseNumbers(bn) {
  baseNumbers = bn;
  nodes.getIds().forEach(function(n) {
    // 割った余りでグループを更新する
    nodes.update({
      id: n,
      label: n.toString(baseNumbers),
    });
  });
}


/*
 * 選択したnodeを削除する
 */
function nodeRemove() {
  selectedNode = network.getSelectedNodes();
  nodes.remove(selectedNode);
  edges.remove(selectedNode);
}

/*
 * inputタグの情報からnodeを追加する
 */
function nodeAddButton() {
  n = Number(document.getElementById("operation_number").value);
  nodeAdd(n);

  nodeSearch(n);
}


/*
 * inputタグの情報からnodeを追加する
 */
function nodeSearchButton() {

  n = Number(document.getElementById("operation_number").value);
  nodeSearch(n);

}

/*
 * nodeIdから対象のnodeを検索しセンター表示
 */
function nodeSearch(n) {

  if (!nodes.get(n)) {
    return;
  }

  //選択したnodeを選択状態にする
  network.setSelection({nodes:[n]});
  selectedNode.nodeId = n;

  //追加したnodeを中心にする
  network.moveTo({
    position: {
      x: network.getPositions()[n].x,
      y: network.getPositions()[n].y
    },
    animation: {
      duration: 1000,
      easingFunction: 'easeInOutQuad'
    }
  });
}
