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


// 一个保存正向的链表元素，一个保存反向的链表元素 改变顺序就好了
var isPalindrome = function(head) {
  let str = ''
  let str_reverse = ''

  while(head) {
    str = str + head.val
    str_reverse = head.val + str_reverse
    head = head.next
  }

  return str === str_reverse
}