import VueCookies from 'vue-cookies'
import final from './final'

export function leaveRoom(socket, i_user) {
    const i_chatroom = VueCookies.get(final.cookie.joinChatRoom);

    console.log('cookie - i_chatroom : ' + i_chatroom)
    if(i_chatroom != null) {
        const param = {
            i_chatroom: i_chatroom,
            i_user: i_user
        }
        socket.emit('leaveChatRoom', param)
        VueCookies.remove(final.cookie.joinChatRoom);
    }
}