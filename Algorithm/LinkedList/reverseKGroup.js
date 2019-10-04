/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  var prev = null
  var curr = head
  var next = null
  var count = 0

  // 检查链表长度是否满足翻转
  var check = head
  var canProceed = 0
  while(canProceed < k && check != null) {
    check = check.next
    canProceed++
  }

  // 满足条件进行翻转
  if(canProceed == k) {
    while(count < k && curr != null) { 
      next = curr.next

      curr.next = prev
      prev = curr

      curr = next
      count++
    }

    if(next != null) {
      // head 为链表翻转之后的尾节点
      head.next = reverseKGroup(next, k)
    }

    //  prev 为链表翻转之后的头节点
    return prev
  } else {
    // 不满足翻转条件，直接返回head
    return head
  }
};