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

 var reverseList = function (head) {
   if(head === null || head.next === null) {
     return head
   }

  // 利用附加指针和临时变量 重新构建单链表 时间O(n) 空间O(1)
   var p = head.next
   head.next = null
   var temp
   while(p !== null) {
     temp = p.next
     p.next = head
     head = p
     p = temp
   }

   return head
  
  //  递归返回原链表的尾节点 (同时递归的效率比迭代高很多) 时间O(n) 空间O(n)
  //  var new_head = reversetList(head.next) // 反转后的头节点 递归到最后才会继续next step
  //  head.next.next = head
  //  head.next = null
  //  return new_head
 }