/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

 var removeNthFromEnd = function(head, n) {
  //  利用两个指针先后移动的关系 画个数轴
  let slow = head
  let fast = head

  while(n > 0) {
    fast = fast.next
    n--
  }
  if(!fast) return head.next
  while(fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next

  return head
 }