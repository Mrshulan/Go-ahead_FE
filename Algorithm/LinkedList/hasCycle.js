/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */


//  跑步理论 环形赛道
var hasCycle = function(head) {
  if(!head || !head.next) return false

  let slow = head
  let fast = head.next

  while(fast && fast.next) {
    if(fast === slow) return true
    slow = slow.next
    fast = fast.next.next
  }

  return false
}