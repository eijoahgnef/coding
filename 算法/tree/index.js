// 树是一种非线性数据结构。二叉树满足两个条件，本身是有序树，且每个节点不能超过2

// 前序遍历
const preOrder = (root) => {
    if (!root) return
    console.log(root.val);
    preOrder(root.left)
    preOrder(root.right)
}

// 中序遍历
const inOrder = (root) => {
    if (!root) return
    inOrder(root.left)
    console.log(root.val);
    inOrder(root.right)
}

// 后续遍历
const postOrder = (root) => {
    if (!root) return
    postOrder(root.left)
    postOrder(root.right)
    console.log(root.val);
}

// 层序遍历
// const levelOrder = (root) => {
//     const res = []
//     function dep(node, level) {
//         if (!node) return
//         if (res.length === level) res.push([])
//         res[level].push(root.val)

//         dep(root.left, level + 1)
//         dep(root.right, level + 1)
//     }

//     dep(root, 0)
//     return res
// }

const levelOrder = function(root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);
    while (q.length !== 0) {
        const currentLevelSize = q.length;
        ret.push([]);
        for (let i = 1; i <= currentLevelSize; ++i) {
            const node = q.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
        
    return ret;
};
