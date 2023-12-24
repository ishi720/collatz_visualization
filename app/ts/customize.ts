module.exports = { collatz, collatzReverseOrder };

/*
 * コラッツ問題の計算を行う
 * @param  {Number} n 自然数
 * @return {Number}   計算結果
 */
function collatz(n: number): number {
  if (n === 1)  {
    return n;
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
function collatzReverseOrder(n: number): number[] {
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
function collatzRepeat(n:number): void {
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
function collatzRepeatButton(): void {
  if ( network.getSelectedNodes().length > 0 ) {
    var n = network.getSelectedNodes()[0];
    collatzRepeat(n);
  }
}

/*
 * すべてのnodeをクリア
 */
function nodeClear(): void {
  nodes.clear();
  edges.clear();
  selectedNode.nodeId = null;
  buttonDisableChange(false);
}

/*
 * nodeを追加する
 * @param  {Number} n 自然数
 */
function nodeAdd(n:number): void {
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
function getGroup(n:number): void {
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
function getGroupMod(n: number, d: number): string {
  return String(n % d);
}

/*
 * 2で割り続けた際のたどり着く奇数を返す
 * @param  {Number} n 自然数
 */
 function getGroupOdd(n: number): string {
  while ( n % 2 === 0 ) {
    n = n / 2;
  }
  return String(n);
}

/*
 * nodeを更新
* nで割った余りでグループ分けする
 */
function nodeUpdateGroupMod(d: number): void {
  var divide = d;
  var groupMode = 'mod';
  nodes.getIds().forEach((n: number) => {
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
 function nodeUpdateGroupOdd(): void {
  groupMode = 'odd';
  nodes.getIds().forEach((n: number) => {
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
function nodeUpdateLabelbaseNumbers(bn: number): void {
  baseNumbers = bn;
  nodes.getIds().forEach((n: number) => {
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
function nodeRemove(): void {
  var _selectedNode = network.getSelectedNodes();
  nodes.remove(_selectedNode);
  edges.remove(_selectedNode);
  selectedNode.nodeId = null;
  var n = Number(document.getElementById("operation_number").value);
  buttonDisableChange(nodes.get(n));
}

/*
 * inputタグの情報からnodeを追加する
 */
function nodeAddButton(): void {
  var n = Number(document.getElementById("operation_number").value);
  nodeAdd(n);
  nodeSearch(n);
  buttonDisableChange(nodes.get(n));
}


/*
 * inputタグの情報からnodeを追加する
 */
function nodeSearchButton(): void {
  var n = Number(document.getElementById("operation_number").value);
  nodeSearch(n);
}

/*
 * nodeIdから対象のnodeを検索しセンター表示
 */
function nodeSearch(n: number): void {

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
    },
    scale: 1
  });
}

/*
 * ボタンの状態を切り替える
 * @param  {Boolean} bool
 */
function buttonDisableChange(bool: boolean): void {
  if (bool) {
    operation.addButtonDisabled = true;
    operation.removeButtonDisabled = false;
    operation.serachButtonDisabled = false;
  } else {
    operation.addButtonDisabled = false;
    operation.removeButtonDisabled = true;
    operation.serachButtonDisabled = true;    
  }
}