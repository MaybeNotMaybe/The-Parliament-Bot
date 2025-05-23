// src\core\utils\database.js
const fs = require('fs');
const path = require('path');

// 确保数据目录存在
const DATA_DIR = path.join(__dirname, '../../../data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const CHECK_SETTINGS_FILE = path.join(DATA_DIR, 'checkSettings.json');
const REVIEW_SETTINGS_FILE = path.join(DATA_DIR, 'reviewSettings.json');
const ALLOWED_SERVERS_FILE = path.join(DATA_DIR, 'allowedServers.json');
const COURT_SETTINGS_FILE = path.join(DATA_DIR, 'courtSettings.json');
const COURT_APPLICATIONS_FILE = path.join(DATA_DIR, 'courtApplications.json');
const COURT_VOTES_FILE = path.join(DATA_DIR, 'courtVotes.json');

// 初始化文件
if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, '{}', 'utf8');
}
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, '{}', 'utf8');
}
if (!fs.existsSync(CHECK_SETTINGS_FILE)) {
    fs.writeFileSync(CHECK_SETTINGS_FILE, '{}', 'utf8');
}
if (!fs.existsSync(REVIEW_SETTINGS_FILE)) {
    fs.writeFileSync(REVIEW_SETTINGS_FILE, '{}', 'utf8');
}
if (!fs.existsSync(ALLOWED_SERVERS_FILE)) {
    fs.writeFileSync(ALLOWED_SERVERS_FILE, '{}', 'utf8');
}
if (!fs.existsSync(COURT_SETTINGS_FILE)) {
    fs.writeFileSync(COURT_SETTINGS_FILE, '{}', 'utf8');
}
if (!fs.existsSync(COURT_APPLICATIONS_FILE)) {
    fs.writeFileSync(COURT_APPLICATIONS_FILE, '{}', 'utf8');
}
if (!fs.existsSync(COURT_VOTES_FILE)) {
    fs.writeFileSync(COURT_VOTES_FILE, '{}', 'utf8');
}

// 读取设置数据
function readSettings() {
    try {
        const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取设置文件失败:', err);
        return {};
    }
}

// 写入设置数据
function writeSettings(data) {
    try {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入设置文件失败:', err);
    }
}

// 读取消息数据
function readMessages() {
    try {
        const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取消息文件失败:', err);
        return {};
    }
}

// 写入消息数据
function writeMessages(data) {
    try {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入消息文件失败:', err);
    }
}

// 读取检查设置数据
function readCheckSettings() {
    try {
        const data = fs.readFileSync(CHECK_SETTINGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取检查设置文件失败:', err);
        return {};
    }
}

// 写入检查设置数据
function writeCheckSettings(data) {
    try {
        fs.writeFileSync(CHECK_SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入检查设置文件失败:', err);
    }
}

// 读取审核设置数据
function readReviewSettings() {
    try {
        const data = fs.readFileSync(REVIEW_SETTINGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取审核设置文件失败:', err);
        return {};
    }
}

// 写入审核设置数据
function writeReviewSettings(data) {
    try {
        fs.writeFileSync(REVIEW_SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入审核设置文件失败:', err);
    }
}

// 读取允许服务器数据
function readAllowedServers() {
    try {
        const data = fs.readFileSync(ALLOWED_SERVERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取允许服务器文件失败:', err);
        return {};
    }
}

// 写入允许服务器数据
function writeAllowedServers(data) {
    try {
        fs.writeFileSync(ALLOWED_SERVERS_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入允许服务器文件失败:', err);
    }
}

// 获取下一个提案ID
function getNextId() {
    try {
        const messages = readMessages();
        
        // 从现有消息中找出最大ID
        let maxId = 0;
        for (const messageId in messages) {
            const message = messages[messageId];
            if (message.proposalId && !isNaN(parseInt(message.proposalId))) {
                const proposalId = parseInt(message.proposalId);
                if (proposalId > maxId) {
                    maxId = proposalId;
                }
            }
        }
        
        // 返回最大ID+1，或者1（如果没有现存消息）
        return maxId > 0 ? maxId + 1 : 1;
    } catch (err) {
        console.error('获取下一个ID失败:', err);
        return 1; // 默认从1开始
    }
}

// 保存设置
async function saveSettings(guildId, settingsData) {
    const settings = readSettings();
    settings[guildId] = settingsData;
    writeSettings(settings);
    console.log(`成功保存设置 - guildId: ${guildId}`, settingsData);
    return settingsData;
}

// 获取设置
async function getSettings(guildId) {
    const settings = readSettings();
    const result = settings[guildId];
    console.log(`获取设置 - guildId: ${guildId}`, result);
    return result;
}

// 保存消息
async function saveMessage(messageData) {
    const messages = readMessages();
    messages[messageData.messageId] = messageData;
    writeMessages(messages);
    console.log(`成功保存消息 - messageId: ${messageData.messageId}`);
    return messageData;
}

// 获取消息
async function getMessage(messageId) {
    const messages = readMessages();
    return messages[messageId];
}

// 更新消息
async function updateMessage(messageId, updates) {
    const messages = readMessages();
    const message = messages[messageId];
    if (message) {
        const updated = { ...message, ...updates };
        messages[messageId] = updated;
        writeMessages(messages);
        return updated;
    }
    return null;
}

// 获取所有消息
async function getAllMessages() {
    return readMessages();
}

// 保存检查频道设置
async function saveCheckChannelSettings(guildId, checkSettings) {
    const settings = readCheckSettings();
    settings[guildId] = checkSettings;
    writeCheckSettings(settings);
    console.log(`成功保存检查设置 - guildId: ${guildId}`, checkSettings);
    return checkSettings;
}

// 获取检查频道设置
async function getCheckChannelSettings(guildId) {
    const settings = readCheckSettings();
    const result = settings[guildId];
    console.log(`获取检查设置 - guildId: ${guildId}`, result);
    return result;
}

// 获取所有检查频道设置
async function getAllCheckChannelSettings() {
    return readCheckSettings();
}

// 保存审核设置
async function saveReviewSettings(guildId, reviewSettings) {
    const settings = readReviewSettings();
    settings[guildId] = reviewSettings;
    writeReviewSettings(settings);
    console.log(`成功保存审核设置 - guildId: ${guildId}`, reviewSettings);
    return reviewSettings;
}

// 获取审核设置
async function getReviewSettings(guildId) {
    const settings = readReviewSettings();
    const result = settings[guildId];
    console.log(`获取审核设置 - guildId: ${guildId}`, result);
    return result;
}

// 获取服务器的允许服务器列表
async function getAllowedServers(guildId) {
    const servers = readAllowedServers();
    if (!servers[guildId]) {
        return [];
    }
    // 返回服务器ID列表
    const result = Object.keys(servers[guildId]);
    console.log(`获取允许服务器列表 - guildId: ${guildId}`, result);
    return result;
}

// 添加允许的服务器
async function addAllowedServer(guildId, targetGuildId) {
    const servers = readAllowedServers();
    if (!servers[guildId]) {
        servers[guildId] = {};
    }
    
    if (!servers[guildId][targetGuildId]) {
        servers[guildId][targetGuildId] = {
            allowedForums: []
        };
        writeAllowedServers(servers);
        console.log(`成功添加允许服务器 - guildId: ${guildId}, targetGuildId: ${targetGuildId}`);
        return true;
    }
    
    console.log(`服务器已存在于允许列表中 - guildId: ${guildId}, targetGuildId: ${targetGuildId}`);
    return false;
}

// 移除允许的服务器
async function removeAllowedServer(guildId, targetGuildId) {
    const servers = readAllowedServers();
    if (!servers[guildId] || !servers[guildId][targetGuildId]) {
        return false;
    }
    
    delete servers[guildId][targetGuildId];
    writeAllowedServers(servers);
    console.log(`成功移除允许服务器 - guildId: ${guildId}, targetGuildId: ${targetGuildId}`);
    return true;
}

// 检查服务器是否在允许列表中
async function isServerAllowed(guildId, targetGuildId) {
    const servers = readAllowedServers();
    const allowed = !!(servers[guildId] && servers[guildId][targetGuildId]);
    console.log(`检查服务器是否允许 - guildId: ${guildId}, targetGuildId: ${targetGuildId}, allowed: ${allowed}`);
    return allowed;
}

// 获取服务器的允许论坛频道列表
async function getAllowedForums(guildId, targetServerId) {
    const servers = readAllowedServers();
    if (!servers[guildId] || !servers[guildId][targetServerId]) {
        return [];
    }
    const result = servers[guildId][targetServerId].allowedForums || [];
    console.log(`获取允许论坛列表 - guildId: ${guildId}, targetServerId: ${targetServerId}`, result);
    return result;
}

// 添加允许的论坛频道
async function addAllowedForum(guildId, targetServerId, forumChannelId) {
    const servers = readAllowedServers();
    
    // 确保数据结构存在
    if (!servers[guildId]) {
        servers[guildId] = {};
    }
    if (!servers[guildId][targetServerId]) {
        servers[guildId][targetServerId] = { allowedForums: [] };
    }
    if (!servers[guildId][targetServerId].allowedForums) {
        servers[guildId][targetServerId].allowedForums = [];
    }
    
    // 检查是否已存在
    if (!servers[guildId][targetServerId].allowedForums.includes(forumChannelId)) {
        servers[guildId][targetServerId].allowedForums.push(forumChannelId);
        writeAllowedServers(servers);
        console.log(`成功添加允许论坛 - guildId: ${guildId}, targetServerId: ${targetServerId}, forumId: ${forumChannelId}`);
        return true;
    }
    
    console.log(`论坛已存在于允许列表中 - guildId: ${guildId}, targetServerId: ${targetServerId}, forumId: ${forumChannelId}`);
    return false;
}

// 移除允许的论坛频道
async function removeAllowedForum(guildId, targetServerId, forumChannelId) {
    const servers = readAllowedServers();
    
    if (!servers[guildId] || !servers[guildId][targetServerId] || !servers[guildId][targetServerId].allowedForums) {
        return false;
    }
    
    const index = servers[guildId][targetServerId].allowedForums.indexOf(forumChannelId);
    if (index > -1) {
        servers[guildId][targetServerId].allowedForums.splice(index, 1);
        writeAllowedServers(servers);
        console.log(`成功移除允许论坛 - guildId: ${guildId}, targetServerId: ${targetServerId}, forumId: ${forumChannelId}`);
        return true;
    }
    
    console.log(`论坛不在允许列表中 - guildId: ${guildId}, targetServerId: ${targetServerId}, forumId: ${forumChannelId}`);
    return false;
}

// 检查论坛频道是否在允许列表中
async function isForumAllowed(guildId, targetServerId, forumChannelId) {
    const allowedForums = await getAllowedForums(guildId, targetServerId);
    const allowed = allowedForums.includes(forumChannelId);
    console.log(`检查论坛是否允许 - guildId: ${guildId}, targetServerId: ${targetServerId}, forumId: ${forumChannelId}, allowed: ${allowed}`);
    return allowed;
}

// 获取服务器的详细白名单信息（包括论坛）
async function getServerWhitelistDetails(guildId, targetServerId) {
    const servers = readAllowedServers();
    if (!servers[guildId] || !servers[guildId][targetServerId]) {
        return { allowed: false, allowedForums: [] };
    }
    
    return {
        allowed: true,
        allowedForums: servers[guildId][targetServerId].allowedForums || []
    };
}

// 法庭设置相关函数
function readCourtSettings() {
    try {
        const data = fs.readFileSync(COURT_SETTINGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取法庭设置文件失败:', err);
        return {};
    }
}

function writeCourtSettings(data) {
    try {
        fs.writeFileSync(COURT_SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入法庭设置文件失败:', err);
    }
}

// 法庭申请相关函数
function readCourtApplications() {
    try {
        const data = fs.readFileSync(COURT_APPLICATIONS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取法庭申请文件失败:', err);
        return {};
    }
}

function writeCourtApplications(data) {
    try {
        fs.writeFileSync(COURT_APPLICATIONS_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入法庭申请文件失败:', err);
    }
}

// 法庭投票相关函数
function readCourtVotes() {
    try {
        const data = fs.readFileSync(COURT_VOTES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('读取法庭投票文件失败:', err);
        return {};
    }
}

function writeCourtVotes(data) {
    try {
        fs.writeFileSync(COURT_VOTES_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('写入法庭投票文件失败:', err);
    }
}

// 保存法庭设置
async function saveCourtSettings(guildId, courtSettings) {
    const settings = readCourtSettings();
    settings[guildId] = courtSettings;
    writeCourtSettings(settings);
    console.log(`成功保存法庭设置 - guildId: ${guildId}`, courtSettings);
    return courtSettings;
}

// 获取法庭设置
async function getCourtSettings(guildId) {
    const settings = readCourtSettings();
    const result = settings[guildId];
    console.log(`获取法庭设置 - guildId: ${guildId}`, result);
    return result;
}

// 获取下一个法庭申请ID
function getNextCourtId() {
    try {
        const applications = readCourtApplications();
        
        let maxId = 0;
        for (const applicationId in applications) {
            const application = applications[applicationId];
            if (application.courtId && !isNaN(parseInt(application.courtId))) {
                const courtId = parseInt(application.courtId);
                if (courtId > maxId) {
                    maxId = courtId;
                }
            }
        }
        
        return maxId > 0 ? maxId + 1 : 1;
    } catch (err) {
        console.error('获取下一个法庭ID失败:', err);
        return 1;
    }
}

// 保存法庭申请
async function saveCourtApplication(applicationData) {
    const applications = readCourtApplications();
    applications[applicationData.messageId] = applicationData;
    writeCourtApplications(applications);
    console.log(`成功保存法庭申请 - messageId: ${applicationData.messageId}`);
    return applicationData;
}

// 获取法庭申请
async function getCourtApplication(messageId) {
    const applications = readCourtApplications();
    return applications[messageId];
}

// 更新法庭申请
async function updateCourtApplication(messageId, updates) {
    const applications = readCourtApplications();
    const application = applications[messageId];
    if (application) {
        const updated = { ...application, ...updates };
        applications[messageId] = updated;
        writeCourtApplications(applications);
        return updated;
    }
    return null;
}

// 获取所有法庭申请
async function getAllCourtApplications() {
    return readCourtApplications();
}

// 保存法庭投票
async function saveCourtVote(voteData) {
    const votes = readCourtVotes();
    votes[voteData.threadId] = voteData;
    writeCourtVotes(votes);
    console.log(`成功保存法庭投票 - threadId: ${voteData.threadId}`);
    return voteData;
}

// 获取法庭投票
async function getCourtVote(threadId) {
    const votes = readCourtVotes();
    return votes[threadId];
}

// 更新法庭投票
async function updateCourtVote(threadId, updates) {
    const votes = readCourtVotes();
    const vote = votes[threadId];
    if (vote) {
        const updated = { ...vote, ...updates };
        votes[threadId] = updated;
        writeCourtVotes(votes);
        return updated;
    }
    return null;
}

// 获取所有法庭投票
async function getAllCourtVotes() {
    return readCourtVotes();
}

module.exports = {
    saveSettings,
    getSettings,
    saveMessage,
    getMessage,
    updateMessage,
    getAllMessages,
    getNextId,

    // 审核相关导出
    saveCheckChannelSettings,
    getCheckChannelSettings,
    getAllCheckChannelSettings,
    saveReviewSettings,
    getReviewSettings,
    getAllowedServers,
    addAllowedServer,
    removeAllowedServer,
    isServerAllowed,
    getAllowedForums,
    addAllowedForum,
    removeAllowedForum,
    isForumAllowed,
    getServerWhitelistDetails,

    // 法庭相关导出
    saveCourtSettings,
    getCourtSettings,
    getNextCourtId,
    saveCourtApplication,
    getCourtApplication,
    updateCourtApplication,
    getAllCourtApplications,
    saveCourtVote,
    getCourtVote,
    updateCourtVote,
    getAllCourtVotes 
};