// 递归经典题目
// 1 返回值 2 调用单元f(xi)做了什么 3 终止条件
// 给定 1->2->3->4, 你应该返回 2->1->4->3.
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* 
递归(递推 + 回归)
你可能想知道如何实现调用自身的函数。诀窍在于，每当递归函数调用自身时，它都会将给定的问题拆解为子问题。递归调用继续进行，直到到子问题无需进一步递归就可以解决的地步。

为了确保递归函数不会导致无限循环，它应具有以下属性：
1. 一个简单的基本案例（basic case）（或一些案例） —— 能够不使用递归来产生答案的终止方案。
2. 一组规则，也称作递推关系（recurrence relation），可将所有其他情况拆分到基本案例。

递归解法 之前 -> (head -> next) -> 之后 
1. 返回值 
交换完成的子链表
处理好的指针 next

2. 递归过程(调用单元) (主要干了什么) 
设需要交换的两个点为 head 和 next，head 连接后面交换完成的子链表，next 连接 head，完成交换
之前 -> (next) -> head -> 之后 (实则指向了 下一组返回值)

3. 终止条件 
head为null(无节点) 或者 next为null(只剩一个) 无法进行交换

伪代码 function swap(head) {
  next = head.next
  head.next = swap(next.next)
  next.next = head
  return next
}
*/
var swapPairs = function (head) {
  // 终止条件递归底
  if(head == null || head.next == null) {
    return head
  }
  
  // 一组规则
  let next = head.next
  head.next = swapPairs(next.next) // 启用调用单元(下面会暂停进行 直到里边return) 先修改head.next -> 下一次换上来的 next  之后修改当前的next 改变到前面 -> 自己
  next.next = head // head <- next  => next -> head 然后return next

  // 递归返回值
  return next
}


// 迭代法
var swapPairs = function(head) {
  // 新增假节点放到最前面 简化操作 方便循环体更新first second 也方便之后的 return(对应终止条件输出答案)
  const dummy = new ListNode(0)
  dummy.next = head
  let current = dummy

  while(current.next != null && current.next.next != null) {
    // 初始化双指针    
    const first = current.next
    const second = current.next.next
    // 更新双指针和current指针 (画轴苗一下就知道了)
    first.next = second.next
    second.next = first
    current.next = second
    
    //更新指针
    current = current.next.next
    
  }
  // 返回新的头部
  return dummy.next
};