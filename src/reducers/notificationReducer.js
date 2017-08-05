import { SHOW_NOTIFICATION, CLEAR_NOTIFICATION, SHOW_SNACKBAR, CLEAR_SNACKBAR} from '../actions/notificationActions';

const initialState = {
  showSnackbar: false,
  snackbar: {},
  showNotification: false,
  notification: {}
};

const handlers = { 
  [SHOW_NOTIFICATION]: (_, action) => ({showNotification: true, notification: action.payload.nfn}),
  [CLEAR_NOTIFICATION]: (_, action) => ({showNotification: false, notification: {}}),
  [SHOW_SNACKBAR]: (_, action) => ({showSnackbar: true, snackbar: action.payload.snackbar}),
  [CLEAR_SNACKBAR]: (_, action) => ({showSnackbar: false, snackbar: {}})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
