
import { Difficulty, AlgorithmType, Problem, WeekPlan, AlgorithmScenario } from './types';

// Translation Map for Tags
export const TAG_CN: Record<AlgorithmType | string, string> = {
  [AlgorithmType.SIMULATION]: '模拟',
  [AlgorithmType.GREEDY]: '贪心',
  [AlgorithmType.SEARCH]: '搜索',
  [AlgorithmType.DP]: '动态规划',
  [AlgorithmType.GRAPH]: '图论',
  [AlgorithmType.MATH]: '数学',
  [AlgorithmType.DATA_STRUCTURE]: '数据结构',
  [AlgorithmType.STRING]: '字符串',
  'Enumeration': '枚举',
  'Bitmask': '状压',
  'Logic': '逻辑推理',
  'Toposort': '拓扑排序',
  'Deque': '双端队列',
  'Heap': '堆',
  'Interval': '区间',
  'Constructive': '构造',
  'Flow': '网络流',
  'ST Table': 'ST表',
  'Hash': '哈希',
  'Matrix': '矩阵',
  'Binary Search': '二分',
  'Tree': '树',
  'Counting': '计数',
};

// Format: [ID, Title, Difficulty, [Tags], KnowledgePoints(string), VisualizerType, LuoguDifficulty]
type CompactProblem = [string, string, Difficulty, AlgorithmType[], string, string, string];

const T1_DATA: CompactProblem[] = [
  // T1: Strictly "普及/提高-" (Yellow).
  // Simulation / Greedy (Harder)
  ['P1090', '合并果子', Difficulty.T1, [AlgorithmType.GREEDY], '哈夫曼树/优先队列', 'greedy', '普及/提高-'],
  ['P1309', '瑞士轮', Difficulty.T1, [AlgorithmType.SIMULATION], '排序/归并', 'simulation', '普及/提高-'],
  ['P1563', '玩具谜题', Difficulty.T1, [AlgorithmType.SIMULATION], '模拟', 'simulation', '普及/提高-'],
  ['P1328', '生活大爆炸版石头剪刀布', Difficulty.T1, [AlgorithmType.SIMULATION], '周期性/模拟', 'simulation', '普及/提高-'],
  ['P1031', '均分纸牌', Difficulty.T1, [AlgorithmType.GREEDY], '贪心', 'greedy', '普及/提高-'],
  ['P1208', '混合牛奶 Mixing Milk', Difficulty.T1, [AlgorithmType.GREEDY], '贪心/排序', 'greedy', '普及/提高-'],
  ['P1803', '凌乱的yyy / 线段覆盖', Difficulty.T1, [AlgorithmType.GREEDY], '贪心/结构体排序', 'greedy', '普及/提高-'],
  ['P1012', '拼数', Difficulty.T1, [AlgorithmType.GREEDY], '字符串排序', 'greedy', '普及/提高-'],
  ['P1003', '铺地毯', Difficulty.T1, [AlgorithmType.SIMULATION], '模拟/倒序查找', 'matrix', '普及/提高-'],
  ['P1618', '三连击（升级版）', Difficulty.T1, [AlgorithmType.SEARCH], '全排列/枚举', 'tree', '普及/提高-'],
  ['P1068', '分数线划定', Difficulty.T1, [AlgorithmType.SIMULATION], '排序', 'greedy', '普及/提高-'],
  ['P1323', '删数问题加强版', Difficulty.T1, [AlgorithmType.GREEDY], '贪心/堆', 'greedy', '普及/提高-'],
  ['P1106', '删数问题', Difficulty.T1, [AlgorithmType.GREEDY], '贪心', 'greedy', '普及/提高-'],
  ['P1096', 'Hanoi 双塔问题', Difficulty.T1, [AlgorithmType.MATH], '高精度/递推', 'math', '普及/提高-'],
  
  // Search / Binary Search (Yellow)
  ['P1157', '组合的输出', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS/回溯', 'tree', '普及/提高-'],
  ['P1219', '八皇后', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS/回溯', 'matrix', '普及/提高-'],
  ['P1443', '马的遍历', Difficulty.T1, [AlgorithmType.SEARCH], 'BFS', 'matrix', '普及/提高-'],
  ['P1162', '填涂颜色', Difficulty.T1, [AlgorithmType.SEARCH], 'BFS/DFS', 'matrix', '普及/提高-'],
  ['P1036', '选数', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS/素数判断', 'tree', '普及/提高-'],
  ['P1101', '单词方阵', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS/方向数组', 'matrix', '普及/提高-'],
  ['P2404', '自然数的拆分问题', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS', 'tree', '普及/提高-'],
  ['P1605', '迷宫', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS', 'matrix', '普及/提高-'],
  ['P1226', '【模板】快速幂', Difficulty.T1, [AlgorithmType.MATH], '快速幂', 'math', '普及/提高-'],
  ['P1873', '砍树', Difficulty.T1, [AlgorithmType.SEARCH], '二分答案', 'binary_search', '普及/提高-'],
  ['P2440', '木材加工', Difficulty.T1, [AlgorithmType.SEARCH], '二分答案', 'binary_search', '普及/提高-'],
  ['P1182', '数列分段 Section II', Difficulty.T1, [AlgorithmType.SEARCH], '二分答案', 'binary_search', '普及/提高-'],
  ['P3853', '路标设置', Difficulty.T1, [AlgorithmType.SEARCH], '二分答案', 'binary_search', '普及/提高-'],
  ['P1102', 'A-B 数对', Difficulty.T1, [AlgorithmType.SEARCH], '二分/Map', 'binary_search', '普及/提高-'],
  ['P1464', 'Function', Difficulty.T1, [AlgorithmType.SEARCH], '记忆化搜索', 'tree', '普及/提高-'],
  ['P1928', '外星密码', Difficulty.T1, [AlgorithmType.SEARCH], '递归/字符串', 'tree', '普及/提高-'],
  ['P1460', '健康的荷斯坦奶牛', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS/剪枝', 'tree', '普及/提高-'],
  ['P1118', '[USACO06FEB] Backward Digit Sums G', Difficulty.T1, [AlgorithmType.SEARCH], '杨辉三角/全排列', 'tree', '普及/提高-'],
  ['P1019', '单词接龙', Difficulty.T1, [AlgorithmType.SEARCH], 'DFS/字符串', 'tree', '普及/提高-'],
  ['P1032', '字串变换', Difficulty.T1, [AlgorithmType.SEARCH], 'BFS', 'tree', '普及/提高-'],

  // Dynamic Programming (Yellow) - EXPANDED
  ['P1048', '采药', Difficulty.T1, [AlgorithmType.DP], '01背包', 'knapsack', '普及/提高-'],
  ['P1616', '疯狂的采药', Difficulty.T1, [AlgorithmType.DP], '完全背包', 'knapsack', '普及/提高-'],
  ['P1002', '过河卒', Difficulty.T1, [AlgorithmType.DP], '网格DP', 'matrix', '普及/提高-'],
  ['P1216', '数字三角形', Difficulty.T1, [AlgorithmType.DP], '线性DP', 'matrix', '普及/提高-'],
  ['P1115', '最大子段和', Difficulty.T1, [AlgorithmType.DP], '线性DP', 'knapsack', '普及/提高-'],
  ['P1049', '装箱问题', Difficulty.T1, [AlgorithmType.DP], '01背包', 'knapsack', '普及/提高-'],
  ['P1060', '开心的金明', Difficulty.T1, [AlgorithmType.DP], '01背包', 'knapsack', '普及/提高-'],
  ['P1802', '5 倍经验日', Difficulty.T1, [AlgorithmType.DP], '01背包变种', 'knapsack', '普及/提高-'],
  ['P1164', '小A点菜', Difficulty.T1, [AlgorithmType.DP], '背包计数', 'knapsack', '普及/提高-'],
  ['P1507', 'NASA的食物计划', Difficulty.T1, [AlgorithmType.DP], '二维费用背包', 'knapsack', '普及/提高-'],
  ['P1910', 'L国的战斗之间谍', Difficulty.T1, [AlgorithmType.DP], '二维费用背包', 'knapsack', '普及/提高-'],
  ['P1855', '榨取kkksc03', Difficulty.T1, [AlgorithmType.DP], '二维费用背包', 'knapsack', '普及/提高-'],
  ['P2871', 'Charm Bracelet S', Difficulty.T1, [AlgorithmType.DP], '01背包', 'knapsack', '普及/提高-'],
  ['P1734', '最大约数和', Difficulty.T1, [AlgorithmType.DP], '背包问题', 'knapsack', '普及/提高-'],
  ['P2347', '砝码称重', Difficulty.T1, [AlgorithmType.DP], '背包/Bitset', 'knapsack', '普及/提高-'],
  ['P1057', '传球游戏', Difficulty.T1, [AlgorithmType.DP], '环形DP', 'matrix', '普及/提高-'],
  ['P1434', '滑雪', Difficulty.T1, [AlgorithmType.DP], '记忆化搜索', 'matrix', '普及/提高-'],
  ['P2437', '蜜蜂路线', Difficulty.T1, [AlgorithmType.DP], '高精度斐波那契', 'knapsack', '普及/提高-'],
  ['P1025', '数的划分', Difficulty.T1, [AlgorithmType.DP], 'DP/搜索', 'knapsack', '普及/提高-'],
  ['P1095', '守望者的逃离', Difficulty.T1, [AlgorithmType.DP], 'DP/贪心', 'knapsack', '普及/提高-'],
  ['P1077', '摆花', Difficulty.T1, [AlgorithmType.DP], 'DP', 'knapsack', '普及/提高-'],
  ['P1064', '金明的预算方案', Difficulty.T1, [AlgorithmType.DP], '分组背包', 'knapsack', '普及/提高-'],
  ['P1156', '垃圾陷阱', Difficulty.T1, [AlgorithmType.DP], '背包DP', 'knapsack', '普及/提高-'],
  ['P1044', '栈', Difficulty.T1, [AlgorithmType.MATH], '卡特兰数/DP', 'math', '普及/提高-'],
  ['P1028', '数的计算', Difficulty.T1, [AlgorithmType.DP], '递推/DP', 'knapsack', '普及/提高-'],
  ['P1280', '尼克的任务', Difficulty.T1, [AlgorithmType.DP], '线性DP', 'knapsack', '普及/提高-'],
  ['P1757', '通天之分组背包', Difficulty.T1, [AlgorithmType.DP], '分组背包', 'knapsack', '普及/提高-'],
  ['P1833', '樱花', Difficulty.T1, [AlgorithmType.DP], '混合背包', 'knapsack', '普及/提高-'],
  ['P1510', '精卫填海', Difficulty.T1, [AlgorithmType.DP], '01背包/剩余容量', 'knapsack', '普及/提高-'],
  ['P2925', 'Hay For Sale S', Difficulty.T1, [AlgorithmType.DP], '01背包', 'knapsack', '普及/提高-'],
  ['P1130', '红牌', Difficulty.T1, [AlgorithmType.DP], 'DP', 'matrix', '普及/提高-'],
  ['P1586', '四方定理', Difficulty.T1, [AlgorithmType.DP], '完全背包', 'knapsack', '普及/提高-'],
  ['P1832', 'A+B Problem（再升级）', Difficulty.T1, [AlgorithmType.DP], '素数筛/完全背包', 'knapsack', '普及/提高-'],
  ['P2196', '挖地雷', Difficulty.T1, [AlgorithmType.DP], 'DAG DP', 'graph', '普及/提高-'],
  ['P1233', '木棍加工', Difficulty.T1, [AlgorithmType.GREEDY], 'Dilworth/贪心', 'greedy', '普及/提高-'],
];

const T2_DATA: CompactProblem[] = [
  // T2: Mostly Green (普及+/提高) and some Blue (提高+/省选-).
  ['P1880', '石子合并', Difficulty.T2, [AlgorithmType.DP], '区间DP', 'matrix', '提高+/省选-'],
  ['P1352', '没有上司的舞会', Difficulty.T2, [AlgorithmType.DP], '树形DP', 'tree', '普及+/提高'],
  ['P1020', '导弹拦截', Difficulty.T2, [AlgorithmType.DP], 'LIS/Dilworth', 'knapsack', '普及+/提高'],
  ['P1063', '能量项链', Difficulty.T2, [AlgorithmType.DP], '区间DP', 'matrix', '提高+/省选-'],
  ['P1541', '乌龟棋', Difficulty.T2, [AlgorithmType.DP], '线性DP', 'matrix', '普及+/提高'],
  ['P1091', '合唱队形', Difficulty.T2, [AlgorithmType.DP], 'LIS变种', 'knapsack', '普及+/提高'],
  ['P1439', '【模板】最长公共子序列', Difficulty.T2, [AlgorithmType.DP], 'LCS/LIS转化', 'knapsack', '普及+/提高'],
  ['P3372', '【模板】线段树 1', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '线段树', 'tree', '普及+/提高'],
  ['P3368', '【模板】树状数组 2', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '树状数组', 'binary_search', '普及+/提高'],
  ['P3374', '【模板】树状数组 1', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '树状数组', 'binary_search', '普及+/提高'],
  ['P3379', '【模板】最近公共祖先 (LCA)', Difficulty.T2, [AlgorithmType.GRAPH], '倍增/LCA', 'tree', '提高+/省选-'],
  ['P1908', '逆序对', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '归并排序/树状数组', 'binary_search', '普及+/提高'],
  ['P1168', '中位数', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '对顶堆/链表', 'binary_search', '提高+/省选-'],
  ['P1090', '合并果子', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '哈夫曼树', 'tree', '普及/提高-'],
  ['P1631', '序列合并', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '优先队列', 'binary_search', '提高+/省选-'],
  ['P1196', '[NOI2002] 银河英雄传说', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '带权并查集', 'graph', '提高+/省选-'],
  ['P3367', '【模板】并查集', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '并查集', 'graph', '普及/提高-'],
  ['P1892', '团伙', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '并查集', 'graph', '普及+/提高'],
  ['P2024', '食物链', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '种类并查集', 'graph', '提高+/省选-'],
  ['P3371', '【模板】单源最短路径 (Weak)', Difficulty.T2, [AlgorithmType.GRAPH], 'Dijkstra', 'graph', '普及+/提高'],
  ['P4779', '【模板】单源最短路径 (Standard)', Difficulty.T2, [AlgorithmType.GRAPH], 'Dijkstra堆优化', 'graph', '普及+/提高'],
  ['P3366', '【模板】最小生成树', Difficulty.T2, [AlgorithmType.GRAPH], 'Kruskal/Prim', 'graph', '普及+/提高'],
  ['P1144', '最短路计数', Difficulty.T2, [AlgorithmType.GRAPH], 'BFS/最短路', 'graph', '普及+/提高'],
  ['P1629', '邮递员送信', Difficulty.T2, [AlgorithmType.GRAPH], '反向图/Dijkstra', 'graph', '普及+/提高'],
  ['P1522', '牛的旅行 Cow Tours', Difficulty.T2, [AlgorithmType.GRAPH], 'Floyd', 'graph', '普及+/提高'],
  ['P2853', 'Cow Picnic S', Difficulty.T2, [AlgorithmType.GRAPH], 'DFS/BFS', 'graph', '普及+/提高'],
  ['P1119', '灾后重建', Difficulty.T2, [AlgorithmType.GRAPH], 'Floyd', 'matrix', '普及+/提高'],
  ['P3905', '道路重建', Difficulty.T2, [AlgorithmType.GRAPH], '最短路', 'graph', '普及+/提高'],
  ['P1141', '01迷宫', Difficulty.T2, [AlgorithmType.SEARCH], 'BFS/联通块', 'matrix', '普及/提高-'],
  ['P1379', '八数码难题', Difficulty.T2, [AlgorithmType.SEARCH], 'BFS', 'matrix', '提高+/省选-'],
  ['P1126', '机器人搬重物', Difficulty.T2, [AlgorithmType.SEARCH], 'BFS', 'matrix', '普及+/提高'],
  ['P1763', '埃及分数', Difficulty.T2, [AlgorithmType.SEARCH], 'IDDFS', 'tree', '提高+/省选-'],
  ['P1074', '靶形数独', Difficulty.T2, [AlgorithmType.SEARCH], 'DFS/剪枝', 'matrix', '提高+/省选-'],
  ['P1111', '修复公路', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], 'Kruskal/并查集', 'graph', '普及+/提高'],
  ['P1197', '星球大战', Difficulty.T2, [AlgorithmType.GRAPH], '逆向并查集', 'graph', '提高+/省选-'],
  ['P2341', '【模板】强连通分量', Difficulty.T2, [AlgorithmType.GRAPH], 'Tarjan', 'graph', '普及+/提高'],
  ['P2002', '消息扩散', Difficulty.T2, [AlgorithmType.GRAPH], 'Tarjan/缩点', 'graph', '提高+/省选-'],
  ['P2863', 'The Cow Prom S', Difficulty.T2, [AlgorithmType.GRAPH], 'Tarjan', 'graph', '提高+/省选-'],
  ['P2661', '信息传递', Difficulty.T2, [AlgorithmType.GRAPH], 'Tarjan/并查集', 'graph', '提高+/省选-'],
  ['P1896', '互不侵犯', Difficulty.T2, [AlgorithmType.DP], '状压DP', 'matrix', '提高+/省选-'],
  ['P3842', '线段', Difficulty.T2, [AlgorithmType.DP], '线性DP', 'matrix', '普及+/提高'],
  ['P2016', '战略游戏', Difficulty.T2, [AlgorithmType.DP], '树形DP', 'tree', '提高+/省选-'],
  ['P1273', '有线电视网', Difficulty.T2, [AlgorithmType.DP], '树形DP/分组背包', 'tree', '提高+/省选-'],
  ['P1122', '最大子树和', Difficulty.T2, [AlgorithmType.DP], '树形DP', 'tree', '普及+/提高'],
  ['P2014', '选课', Difficulty.T2, [AlgorithmType.DP], '树形DP', 'tree', '提高+/省选-'],
  ['P2015', '二叉苹果树', Difficulty.T2, [AlgorithmType.DP], '树形DP', 'tree', '提高+/省选-'],
  ['P1351', '联合权值', Difficulty.T2, [AlgorithmType.GRAPH], 'LCA/树', 'tree', '提高+/省选-'],
  ['P1084', '疫情控制', Difficulty.T2, [AlgorithmType.GREEDY], '倍增/贪心/二分', 'tree', '提高+/省选-'],
  ['P1316', '丢瓶盖', Difficulty.T2, [AlgorithmType.SEARCH], '二分答案', 'binary_search', '提高+/省选-'],
  ['P2678', '跳石头', Difficulty.T2, [AlgorithmType.SEARCH], '二分答案', 'binary_search', '普及+/提高'],
  ['P1082', '同余方程', Difficulty.T2, [AlgorithmType.MATH], 'ExGCD', 'math', '提高+/省选-'],
  ['P1516', '青蛙的约会', Difficulty.T2, [AlgorithmType.MATH], 'ExGCD', 'math', '提高+/省选-'],
  ['P3383', '【模板】线性筛素数', Difficulty.T2, [AlgorithmType.MATH], '数论', 'math', '普及+/提高'],
  ['P3811', '【模板】乘法逆元', Difficulty.T2, [AlgorithmType.MATH], '数论', 'math', '普及+/提高'],
  ['P4057', '晨跑', Difficulty.T2, [AlgorithmType.MATH], 'LCM/GCD', 'math', '普及+/提高'],
  ['P1972', '[SDOI2009] HH的项链', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '树状数组/莫队', 'tree', '提高+/省选-'],
  ['P1438', '无聊的数列', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '线段树', 'tree', '提高+/省选-'],
  ['P1253', '扶苏的问题', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '线段树', 'tree', '提高+/省选-'],
  ['P4513', '小白逛公园', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '线段树', 'tree', '提高+/省选-'],
  ['P1471', '方差', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '线段树', 'tree', '提高+/省选-'],
  ['P3373', '【模板】线段树 2', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '线段树', 'tree', '普及+/提高'],
  ['P1801', '黑匣子', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '对顶堆', 'binary_search', '提高+/省选-'],
  ['P2085', '最小函数值', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '堆', 'binary_search', '普及+/提高'],
  ['P1334', '瑞瑞的木板', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '哈夫曼树', 'binary_search', '普及+/提高'],
  ['P1634', '禽兽的传染病', Difficulty.T2, [AlgorithmType.SIMULATION], '模拟/数学', 'simulation', '普及+/提高'],
  ['P1041', '传染病控制', Difficulty.T2, [AlgorithmType.SEARCH], 'DFS/剪枝', 'tree', '提高+/省选-'],
  ['P1160', '队列安排', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '链表', 'binary_search', '普及/提高-'],
  ['P2240', '【深基12.例1】部分背包问题', Difficulty.T2, [AlgorithmType.GREEDY], '贪心', 'knapsack', '普及/提高-'],
  ['P1209', 'Barn Repair G', Difficulty.T2, [AlgorithmType.GREEDY], '贪心', 'greedy', '普及+/提高'],
  ['P2123', '皇后游戏', Difficulty.T2, [AlgorithmType.GREEDY], '微扰法排序', 'greedy', '提高+/省选-'],
  ['P1080', '国王游戏', Difficulty.T2, [AlgorithmType.GREEDY], '高精度/微扰法', 'greedy', '普及+/提高'],
  ['P5017', '摆渡车', Difficulty.T2, [AlgorithmType.DP], 'DP优化', 'knapsack', '普及+/提高'],
  ['P2602', '数字计数', Difficulty.T2, [AlgorithmType.DP], '数位DP', 'knapsack', '提高+/省选-'],
  ['P4170', '涂色', Difficulty.T2, [AlgorithmType.DP], '区间DP', 'matrix', '提高+/省选-'],
  ['P3205', '合唱队', Difficulty.T2, [AlgorithmType.DP], '区间DP', 'matrix', '普及+/提高'],
  ['P1005', '矩阵取数游戏', Difficulty.T2, [AlgorithmType.DP], '区间DP/高精', 'matrix', '提高+/省选-'],
  ['P1220', '关路灯', Difficulty.T2, [AlgorithmType.DP], '区间DP', 'matrix', '提高+/省选-'],
  ['P1156', '垃圾陷阱', Difficulty.T2, [AlgorithmType.DP], '背包DP', 'knapsack', '提高+/省选-'],
  ['P1069', '细胞分裂', Difficulty.T2, [AlgorithmType.MATH], '质因数分解', 'math', '普及+/提高'],
  ['P1134', '阶乘问题', Difficulty.T2, [AlgorithmType.MATH], '数论', 'math', '普及+/提高'],
  ['P1866', '编号', Difficulty.T2, [AlgorithmType.MATH], '组合数学', 'math', '普及+/提高'],
  ['P2822', '组合数问题', Difficulty.T2, [AlgorithmType.MATH], '杨辉三角/前缀和', 'matrix', '提高+/省选-'],
  ['P1135', '奇怪的电梯', Difficulty.T2, [AlgorithmType.SEARCH], 'BFS', 'graph', '普及+/提高'],
  ['P1449', '后缀表达式', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '栈', 'string', '普及/提高-'],
  ['P1739', '表达式括号匹配', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '栈', 'string', '普及/提高-'],
  ['P1981', '表达式求值', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '栈', 'string', '普及+/提高'],
  ['P1106', '删数问题', Difficulty.T2, [AlgorithmType.GREEDY], '贪心', 'greedy', '普及+/提高'],
  ['P1323', '删数问题加强版', Difficulty.T2, [AlgorithmType.GREEDY], '贪心/堆', 'greedy', '普及+/提高'],
  ['P2241', '统计方形', Difficulty.T2, [AlgorithmType.MATH], '组合数学', 'matrix', '普及+/提高'],
  ['P2615', '神奇的幻方', Difficulty.T2, [AlgorithmType.SIMULATION], '模拟', 'matrix', '普及+/提高'],
  ['P3916', '图的遍历', Difficulty.T2, [AlgorithmType.GRAPH], '反向建图/DFS', 'graph', '普及+/提高'],
  ['P5318', '查找文献', Difficulty.T2, [AlgorithmType.GRAPH], 'BFS/DFS', 'graph', '普及+/提高'],
  ['P2921', 'Trick or Treat on the Farm G', Difficulty.T2, [AlgorithmType.GRAPH], '基环树', 'graph', '提高+/省选-'],
  ['P1127', '词链', Difficulty.T2, [AlgorithmType.GRAPH], '欧拉路', 'graph', '提高+/省选-'],
  ['P7911', '网络连接', Difficulty.T2, [AlgorithmType.STRING], '大模拟', 'string', '普及+/提高'],
  ['P7910', '插入排序', Difficulty.T2, [AlgorithmType.SIMULATION], '排序/模拟', 'simulation', '普及/提高-'],
  ['P5658', '括号树', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '栈/树', 'tree', '普及+/提高'],
  ['P5661', '公换乘', Difficulty.T2, [AlgorithmType.SIMULATION], '模拟/队列', 'simulation', '普及+/提高'],
  ['P5019', '铺设道路', Difficulty.T2, [AlgorithmType.GREEDY], '贪心', 'greedy', '普及/提高-'],
  ['P1062', '数列', Difficulty.T2, [AlgorithmType.MATH], '进制/位运算', 'math', '普及+/提高'],
  ['P1149', '火柴棒等式', Difficulty.T2, [AlgorithmType.SEARCH], 'DFS/模拟', 'simulation', '普及/提高-'],
  ['P1542', '包裹快递', Difficulty.T2, [AlgorithmType.SEARCH], '二分', 'binary_search', '普及+/提高'],
  ['P1969', '积木大赛', Difficulty.T2, [AlgorithmType.GREEDY], '贪心', 'greedy', '普及/提高-'],
  ['P4017', '最大食物链计数', Difficulty.T2, [AlgorithmType.GRAPH], '拓扑排序/DP', 'graph', '普及+/提高'],
  ['P5656', '【模板】二元一次不定方程 (ExGCD)', Difficulty.T2, [AlgorithmType.MATH], '数论', 'math', '提高+/省选-'],
  ['P1072', 'Hankson 的趣味题', Difficulty.T2, [AlgorithmType.MATH], 'GCD/枚举', 'math', '提高+/省选-'],
  ['P1103', '书本整理', Difficulty.T2, [AlgorithmType.DP], 'DP', 'knapsack', '提高+/省选-'],
  ['P1113', '杂务', Difficulty.T2, [AlgorithmType.GRAPH], '拓扑排序', 'graph', '普及+/提高'],
  ['P1364', '医院设置', Difficulty.T2, [AlgorithmType.GRAPH], 'BFS/树', 'graph', '普及/提高-'],
  ['P1879', 'Corn Fields G', Difficulty.T2, [AlgorithmType.DP], '状压DP', 'matrix', '提高+/省选-'],
  ['P1886', '滑动窗口 /【模板】单调队列', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '单调队列', 'binary_search', '普及+/提高'],
  ['P2340', 'Cow Exhibition G', Difficulty.T2, [AlgorithmType.DP], '01背包/负数处理', 'knapsack', '普及+/提高'],
  ['P2866', 'Bad Hair Day S', Difficulty.T2, [AlgorithmType.DATA_STRUCTURE], '单调栈', 'binary_search', '普及+/提高'],
  ['P3146', '248 G', Difficulty.T2, [AlgorithmType.DP], '区间DP', 'matrix', '普及+/提高'],
];

const T3_DATA: CompactProblem[] = [
    // Difficulty: Improvement+/Provincial- (Blue) and Provincial/NOI- (Purple)
    ['P1081', '开车旅行', Difficulty.T3, [AlgorithmType.GREEDY, AlgorithmType.DATA_STRUCTURE], '倍增/链表', 'graph', '提高+/省选-'],
    ['P2680', '运输计划', Difficulty.T3, [AlgorithmType.GRAPH], 'LCA/树上差分/二分', 'tree', '提高+/省选-'],
    ['P5021', '赛道修建', Difficulty.T3, [AlgorithmType.GREEDY], '树形DP/二分/贪心', 'tree', '提高+/省选-'],
    ['P1967', '货车运输', Difficulty.T3, [AlgorithmType.GRAPH], '最大生成树/倍增LCA', 'graph', '提高+/省选-'],
    ['P1351', '联合权值', Difficulty.T3, [AlgorithmType.GRAPH], '树形DP/数学', 'tree', '提高+/省选-'],
    ['P2016', '战略游戏', Difficulty.T3, [AlgorithmType.DP], '树形DP/二分图匹配', 'tree', '提高+/省选-'],
    ['P2602', '数字计数', Difficulty.T3, [AlgorithmType.DP], '数位DP', 'knapsack', '提高+/省选-'],
    ['P1040', '加分二叉树', Difficulty.T3, [AlgorithmType.DP], '区间DP/树', 'tree', '提高+/省选-'],
    ['P3959', '宝藏', Difficulty.T3, [AlgorithmType.DP], '状压DP/Steiner Tree', 'matrix', '省选/NOI-'],
    ['P7077', '函数调用', Difficulty.T3, [AlgorithmType.GRAPH], '拓扑排序/DAG', 'graph', '提高+/省选-'],
    ['P2831', '愤怒的小鸟', Difficulty.T3, [AlgorithmType.DP], '状压DP', 'matrix', '提高+/省选-'],
    ['P5658', '括号树', Difficulty.T3, [AlgorithmType.DATA_STRUCTURE], '树形DP/栈', 'tree', '普及+/提高'],
    ['P8867', '建造军营', Difficulty.T3, [AlgorithmType.DP], '树形DP/Tarjan缩点', 'graph', '省选/NOI-'],
    ['P1941', '飞扬的小鸟', Difficulty.T3, [AlgorithmType.DP], '完全背包/滚动数组', 'knapsack', '提高+/省选-'],
    ['P1514', '引水入城', Difficulty.T3, [AlgorithmType.SEARCH], 'BFS/区间覆盖', 'matrix', '提高+/省选-'],
    ['P1073', '最优贸易', Difficulty.T3, [AlgorithmType.GRAPH], 'SPFA/分层图', 'graph', '提高+/省选-'],
    ['P3953', '逛公园', Difficulty.T3, [AlgorithmType.GRAPH], '最短路/记忆化搜索', 'graph', '省选/NOI-'],
    ['P5020', '货币系统', Difficulty.T3, [AlgorithmType.DP], '完全背包/筛法', 'knapsack', '提高+/省选-'],
    ['P7073', '表达式', Difficulty.T3, [AlgorithmType.DATA_STRUCTURE], '表达式树/模拟', 'tree', '提高+/省选-'],
    ['P5662', '纪念品', Difficulty.T3, [AlgorithmType.DP], '完全背包', 'knapsack', '普及+/提高'],
    ['P5663', '加工零件', Difficulty.T3, [AlgorithmType.GRAPH], '最短路/奇偶性', 'graph', '普及+/提高'],
    ['P7912', '小熊的果篮', Difficulty.T3, [AlgorithmType.DATA_STRUCTURE], '链表/块状链表', 'binary_search', '提高+/省选-'],
    ['P8816', '点', Difficulty.T3, [AlgorithmType.DP], 'DP', 'matrix', '提高+/省选-'],
    ['P1311', '选择客栈', Difficulty.T3, [AlgorithmType.SIMULATION], '数学/统计', 'simulation', '普及+/提高'],
    ['P1005', '矩阵取数游戏', Difficulty.T3, [AlgorithmType.DP], '区间DP/高精度', 'matrix', '提高+/省选-'],
    ['P2296', '寻找道路', Difficulty.T3, [AlgorithmType.GRAPH], 'BFS/反向图', 'graph', '提高+/省选-'],
    ['P3958', '奶酪', Difficulty.T3, [AlgorithmType.SEARCH], 'BFS/并查集', 'graph', '提高+/省选-'],
    ['P1038', '神经网络', Difficulty.T3, [AlgorithmType.GRAPH], '拓扑排序', 'graph', '提高+/省选-'],
    ['P2279', '消防局的设立', Difficulty.T3, [AlgorithmType.GREEDY], '树形DP/贪心', 'tree', '提高+/省选-'],
    ['P1052', '过河', Difficulty.T3, [AlgorithmType.DP], '线性DP/路径压缩', 'knapsack', '普及+/提高']
];

const T4_DATA: CompactProblem[] = [
    // Difficulty: Provincial/NOI- (Purple) and NOI/NOI+ (Black)
    ['P5022', '旅行', Difficulty.T4, [AlgorithmType.SEARCH], '基环树/DFS/贪心', 'graph', '提高+/省选-'],
    ['P5664', 'Emiya 家今天的饭', Difficulty.T4, [AlgorithmType.DP], '计数DP/容斥原理', 'knapsack', '提高+/省选-'],
    ['P7116', '微信步数', Difficulty.T4, [AlgorithmType.MATH], '模拟/数学推导', 'math', '提高+/省选-'],
    ['P2051', 'AHOI2009] 中国象棋', Difficulty.T4, [AlgorithmType.DP], '状压DP/计数', 'matrix', '省选/NOI-'],
    ['P2746', '网络维护', Difficulty.T4, [AlgorithmType.GRAPH], 'Tarjan强连通分量', 'graph', '提高+/省选-'],
    ['P3376', '【模板】网络最大流', Difficulty.T4, [AlgorithmType.GRAPH], 'Dinic/MaxFlow', 'graph', '提高+/省选-'],
    ['P3381', '【模板】最小费用最大流', Difficulty.T4, [AlgorithmType.GRAPH], 'MCMF', 'graph', '省选/NOI-'],
    ['P3384', '【模板】重链剖分/树链剖分', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], '树链剖分', 'tree', '提高+/省选-'],
    ['P3834', '【模板】可持久化线段树', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], '主席树', 'tree', '提高+/省选-'],
    ['P3690', '【模板】动态树 (LCT)', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], 'Link Cut Tree', 'tree', '省选/NOI-'],
    ['P3391', '【模板】文艺平衡树', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], 'Splay/FhqTreap', 'tree', '省选/NOI-'],
    ['P6136', '【模板】普通平衡树', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], '平衡树', 'tree', '提高+/省选-'],
    ['P4180', '严格次小生成树', Difficulty.T4, [AlgorithmType.GRAPH], 'MST/LCA', 'graph', '省选/NOI-'],
    ['P2482', '猪国杀', Difficulty.T4, [AlgorithmType.SIMULATION], '大模拟', 'simulation', '省选/NOI-'],
    ['P2254', '瑰丽华尔兹', Difficulty.T4, [AlgorithmType.DP], '单调队列优化DP', 'matrix', '省选/NOI-'],
    ['P2657', 'windy数', Difficulty.T4, [AlgorithmType.DP], '数位DP', 'knapsack', '提高+/省选-'],
    ['P2158', '仪仗队', Difficulty.T4, [AlgorithmType.MATH], '欧拉函数/Mobius', 'matrix', '省选/NOI-'],
    ['P2495', '消耗战', Difficulty.T4, [AlgorithmType.DP], '虚树/树形DP', 'tree', '省选/NOI-'],
    ['P4281', '紧急集合', Difficulty.T4, [AlgorithmType.GRAPH], 'LCA/树上差分', 'tree', '提高+/省选-'],
    ['P3292', '幸运数字', Difficulty.T4, [AlgorithmType.MATH], '线性基/倍增', 'math', '省选/NOI-'],
    ['P3224', '永无乡', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], '线段树合并/并查集', 'tree', '省选/NOI-'],
    ['P3178', '树上操作', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], '树链剖分/线段树', 'tree', '提高+/省选-'],
    ['P4011', '孤岛营救问题', Difficulty.T4, [AlgorithmType.SEARCH], '分层图BFS/状压', 'graph', '提高+/省选-'],
    ['P2762', '太空飞行计划', Difficulty.T4, [AlgorithmType.GRAPH], '网络流/最大权闭合子图', 'graph', '提高+/省选-'],
    ['P1345', '奶牛的电信', Difficulty.T4, [AlgorithmType.GRAPH], '最小割', 'graph', '提高+/省选-'],
    ['P2756', '飞行员配对方案问题', Difficulty.T4, [AlgorithmType.GRAPH], '二分图匹配/最大流', 'graph', '提高+/省选-'],
    ['P1251', '餐巾计划问题', Difficulty.T4, [AlgorithmType.GRAPH], '费用流', 'graph', '省选/NOI-'],
    ['P4016', '负载平衡问题', Difficulty.T4, [AlgorithmType.GRAPH], '费用流', 'graph', '省选/NOI-'],
    ['P4551', '最长异或路径', Difficulty.T4, [AlgorithmType.DATA_STRUCTURE], '01Trie', 'tree', '提高+/省选-'],
    ['P4782', '【模板】2-SAT 问题', Difficulty.T4, [AlgorithmType.GRAPH], '2-SAT/Tarjan', 'graph', '提高+/省选-']
];

// Helper to hydrate problems
const hydrateProblems = (compact: CompactProblem[]): Problem[] => {
  return compact.map(p => ({
    id: p[0],
    title: `${p[0]} ${p[1]}`,
    description: `(Full description available on Luogu)\n\nTopic: ${p[4]}\nAlgorithm: ${p[3].join(', ')}\n\nSource: Luogu ${p[0]}`,
    difficulty: p[2],
    source: p[0],
    tags: p[3],
    knowledgePoints: p[4].split('/'),
    keyInsights: `1. 状态定义/核心思路：\n本题考查${p[4]}。核心在于识别题目属于${p[3][0]}模型。\n\n2. 关键步骤：\n- 分析数据范围。\n- 设计${p[4]}算法。\n- 注意边界条件。\n\n3. 注意：\n请参考洛谷题解区获取详细的状态转移方程或贪心证明。`,
    visualizerType: p[5] as any,
    luoguDifficulty: p[6]
  }));
};

export const ALL_PROBLEMS: Problem[] = [
  ...hydrateProblems(T1_DATA),
  ...hydrateProblems(T2_DATA),
  ...hydrateProblems(T3_DATA),
  ...hydrateProblems(T4_DATA)
];

// Backwards compatibility
export const MOCK_PROBLEMS = ALL_PROBLEMS;

// --- HISTORICAL STATS DATA ---

export const CSP_HISTORY_STATS = [
  {
    year: 2019,
    problems: [
      { name: 'T1 格雷码', difficulty: 'T1', tags: ['模拟', '数学'] },
      { name: 'T2 括号树', difficulty: 'T2', tags: ['数据结构', '栈'] },
      { name: 'T3 树上的数', difficulty: 'T3', tags: ['贪心', '树'] },
      { name: 'T4 Emiya家今天的饭', difficulty: 'T4', tags: ['动态规划', '计数'] }
    ]
  },
  {
    year: 2020,
    problems: [
      { name: 'T1 儒略日', difficulty: 'T1', tags: ['模拟'] },
      { name: 'T2 动物园', difficulty: 'T2', tags: ['状压', '逻辑推理'] },
      { name: 'T3 函数调用', difficulty: 'T3', tags: ['图论', '拓扑排序'] },
      { name: 'T4 贪吃蛇', difficulty: 'T4', tags: ['贪心', '双端队列'] }
    ]
  },
  {
    year: 2021,
    problems: [
      { name: 'T1 廊桥分配', difficulty: 'T1', tags: ['贪心', '堆'] },
      { name: 'T2 括号序列', difficulty: 'T2', tags: ['动态规划', '区间'] },
      { name: 'T3 回文', difficulty: 'T3', tags: ['构造', '双端队列'] },
      { name: 'T4 交通规划', difficulty: 'T4', tags: ['图论', '网络流'] }
    ]
  },
  {
    year: 2022,
    problems: [
      { name: 'T1 假期计划', difficulty: 'T1', tags: ['搜索', '图论'] },
      { name: 'T2 策略游戏', difficulty: 'T2', tags: ['ST表', '贪心'] },
      { name: 'T3 星战', difficulty: 'T3', tags: ['哈希', '图论'] },
      { name: 'T4 数据传输', difficulty: 'T4', tags: ['动态规划', '矩阵'] }
    ]
  },
  {
    year: 2023,
    problems: [
      { name: 'T1 密码锁', difficulty: 'T1', tags: ['枚举'] },
      { name: 'T2 消消乐', difficulty: 'T2', tags: ['栈', '动态规划'] },
      { name: 'T3 结构体', difficulty: 'T3', tags: ['模拟'] },
      { name: 'T4 种树', difficulty: 'T4', tags: ['二分', '树'] }
    ]
  },
  {
    year: 2024,
    problems: [
      { name: 'T1 决斗', difficulty: 'T1', tags: ['贪心'] },
      { name: 'T2 超速检测', difficulty: 'T2', tags: ['数学', '二分'] },
      { name: 'T3 染色', difficulty: 'T3', tags: ['动态规划'] },
      { name: 'T4 擂台赛', difficulty: 'T4', tags: ['树', '模拟'] }
    ]
  },
  {
    year: 2025, // Prediction / Mock Data (Real IDs provided by user)
    problems: [
      { name: 'T1 P14361', difficulty: 'T1', tags: ['贪心', '模拟'] },
      { name: 'T2 P14362', difficulty: 'T2', tags: ['动态规划', '图论'] },
      { name: 'T3 P14363', difficulty: 'T3', tags: ['数据结构', '树'] },
      { name: 'T4 P14364', difficulty: 'T4', tags: ['复杂DP', '高级图论'] }
    ]
  }
];

export const STUDY_PLAN: WeekPlan[] = [
  {
    weekRange: "Week 1-12",
    title: "第一阶段：T1 稳定满分与核心技能",
    description: "彻底根治 T1 不稳。解题稳定在 45-60 分钟。核心：模拟、贪心、搜索、二分、对拍。",
    tasks: [
      "W1: 模拟/枚举 (暴力美学)",
      "W2: 贪心 (排序+直觉)",
      "W3: 搜索 (DFS/BFS)",
      "W4: 二分答案 (Check函数)",
      "W5-8: 建模与对拍 (Brute vs Solve)",
      "W9-12: T1 模拟冲刺"
    ]
  },
  {
    weekRange: "Week 13-22",
    title: "第二阶段：数据结构与图论 (T2/T3 工具箱)",
    description: "架设桥梁。攻克 T2/T3 的工具。栈、堆、并查集、线段树、图论基础。",
    tasks: [
      "W13-14: 堆, 并查集",
      "W15-18: 线段树, 树状数组 (重点)",
      "W19-22: 图论 (最短路, MST, Topo)"
    ]
  },
  {
    weekRange: "Week 23-34",
    title: "第三阶段：动态规划强攻 (决胜 T2)",
    description: "DP 是 CSP-S 的灵魂。线性、背包、区间、树形、状压。",
    tasks: [
      "W23-25: 线性 DP, 背包",
      "W26-28: 区间 DP, 树形 DP",
      "W29-31: 状压 DP (Bitmask)",
      "W32-34: DP 综合复习"
    ]
  },
  {
    weekRange: "Week 35-50",
    title: "第四阶段：数学、专题与冲刺",
    description: "补齐短板 (数学/字符串)，全真模拟。",
    tasks: [
      "W35-38: 数论, 组合数学",
      "W39-42: 高级图论 (LCA, Tarjan), 字符串",
      "W43-50: 全真模拟 (策略定型)"
    ]
  }
];

// --- ANIMATION DATA ---

const GRID_INITIAL = { grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]] };
const ARRAY_INITIAL = { array: [10, 20, 30, 40, 50, 60, 70, 80, 90], target: 70 };
const KNAPSACK_INITIAL = { array: [0, 0, 0, 0, 0, 0, 0, 0, 0], itemWeight: 3, itemValue: 4 };

export const ALGORITHM_SCENARIOS: Record<string, AlgorithmScenario> = {
  'matrix': {
    title: "Grid / Matrix DP Visualization",
    code: [
      "// dp[i][j] = min path sum to (i,j)",
      "for i from 0 to 2:",
      "  for j from 0 to 2:",
      "    dp[i][j] = min(up, left) + cost",
      "    // update cell value"
    ],
    initialData: GRID_INITIAL,
    steps: [
      { lineIndex: 1, description: "Start Grid Traversal", highlights: [], values: {} },
      { lineIndex: 3, description: "Calculate DP state", highlights: [4], secondaryHighlights: [1, 3], values: {'1-1': 7} },
      { lineIndex: 3, description: "Finished", highlights: [8], secondaryHighlights: [], values: {} }
    ]
  },
  'knapsack': {
    title: "0/1 Knapsack / Linear DP",
    code: [
      "// dp[j] = max value at capacity j",
      "for item in items:",
      "  for j from W down to w[i]:",
      "    dp[j] = max(dp[j], dp[j-w] + v)",
      "    // update array"
    ],
    initialData: KNAPSACK_INITIAL,
    steps: [
      { lineIndex: 0, description: "Init DP Array", highlights: [], values: {} },
      { lineIndex: 3, description: "Update index 8", highlights: [8], secondaryHighlights: [5], values: {'8': 4} },
      { lineIndex: 3, description: "Update index 7", highlights: [7], secondaryHighlights: [4], values: {'7': 4} },
    ]
  },
  'tree': {
    title: "Tree Traversal / Recursion",
    code: [
      "function dfs(u):",
      "  visited[u] = true",
      "  for v in children[u]:",
      "    dfs(v)",
      "  return"
    ],
    initialData: {},
    steps: [
      { lineIndex: 0, description: "Start DFS(1)", highlights: [1], values: {} },
      { lineIndex: 1, description: "Visit 1", highlights: [1], values: {'1': 'vis'} },
      { lineIndex: 3, description: "Go to child 2", highlights: [2], secondaryHighlights: [1], values: {} },
      { lineIndex: 1, description: "Visit 2", highlights: [2], values: {'2': 'vis'} }
    ]
  },
  'binary_search': {
    title: "Binary Search",
    code: [
      "low = 0, high = n-1",
      "while low <= high:",
      "  mid = (low + high) / 2",
      "  if arr[mid] < target: low = mid + 1",
      "  else: high = mid - 1"
    ],
    initialData: ARRAY_INITIAL,
    steps: [
      { lineIndex: 0, description: "Init pointers", highlights: [], activePointers: {low:0, high:8} },
      { lineIndex: 2, description: "Check mid", highlights: [4], activePointers: {low:0, high:8, mid:4} },
      { lineIndex: 3, description: "50 < 70, go right", highlights: [], activePointers: {low:5, high:8} }
    ]
  },
  'greedy': {
    title: "Greedy Strategy (Sorting/Selection)",
    code: [
      "// Sort items by criteria",
      "items.sort()",
      "for item in items:",
      "  if check(item):",
      "    take(item)"
    ],
    initialData: { array: [5, 2, 8, 1, 9, 3, 7, 4, 6] },
    steps: [
      { lineIndex: 1, description: "Sort the array first", highlights: [0,1,2,3,4,5,6,7,8], values: {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9} },
      { lineIndex: 3, description: "Check item 1", highlights: [0], activePointers: {i:0} },
      { lineIndex: 4, description: "Take item 1", highlights: [0], secondaryHighlights: [], values: {} },
      { lineIndex: 3, description: "Check item 2", highlights: [1], activePointers: {i:1} }
    ]
  },
  'string': {
    title: "String Processing / Matching",
    code: [
      "// Iterate string characters",
      "for i from 0 to len-1:",
      "  char = s[i]",
      "  // process char",
      "  update_state()"
    ],
    initialData: { array: ["H","e","l","l","o"," ","C","S","P"] },
    steps: [
      { lineIndex: 1, description: "Start scanning", highlights: [0], activePointers: {i:0} },
      { lineIndex: 3, description: "Process 'H'", highlights: [0], values: {} },
      { lineIndex: 1, description: "Next char", highlights: [1], activePointers: {i:1} },
      { lineIndex: 3, description: "Process 'e'", highlights: [1], values: {} }
    ]
  },
  'simulation': {
    title: "Simulation Logic",
    code: [
      "// Simulate process step by step",
      "while condition:",
      "  update_state()",
      "  check_boundary()",
      "  time++"
    ],
    initialData: GRID_INITIAL,
    steps: [
      { lineIndex: 1, description: "Check condition", highlights: [], values: {} },
      { lineIndex: 2, description: "Update cell (1,1)", highlights: [4], values: {'1-1': 9} },
      { lineIndex: 3, description: "Check boundaries", highlights: [], values: {} }
    ]
  },
  'math': {
    title: "Mathematical Computation",
    code: [
      "// Calculate formula",
      "result = 0",
      "for i from 1 to n:",
      "  term = calculate(i)",
      "  result += term"
    ],
    initialData: { array: [1, 1, 2, 3, 5, 8, 13, 21, 34] },
    steps: [
      { lineIndex: 2, description: "Calculate term 1", highlights: [0], activePointers: {i:0} },
      { lineIndex: 4, description: "Add to result", highlights: [0], values: {} },
      { lineIndex: 2, description: "Calculate term 2", highlights: [1], activePointers: {i:1} }
    ]
  },
  'graph': {
    title: "Graph Traversal (BFS/Shortest Path)",
    code: [
      "queue.push(start)",
      "while queue not empty:",
      "  u = queue.pop()",
      "  for v in adj[u]:",
      "    relax(u, v)"
    ],
    initialData: {},
    steps: [
      { lineIndex: 0, description: "Start Node 1", highlights: [1], values: {1: 0} },
      { lineIndex: 2, description: "Pop 1", highlights: [1], values: {} },
      { lineIndex: 4, description: "Visit neighbors", highlights: [2, 3], secondaryHighlights: [1], values: {2:1, 3:1} }
    ]
  }
};
