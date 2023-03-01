// 模拟一个投票的场景
function voteFn() {
    var vote = 0
    function actionVote() {
        vote++
        console.log(vote);
    }
    return actionVote
}
var beginVote = voteFn()
beginVote()  // 1
beginVote()  // 2
beginVote() //  3