import Duck from '../../../src'
import { FETCH_COMMENTS, ADD_COMMENT, UPDATE_COMMENT } from '../redux/actions'

export const commentsInitialState = {
  comments: [],
  ready: false
}

const duck = new Duck('comments', commentsInitialState)

export const fetchComments = duck.defineAction(FETCH_COMMENTS, {
  creator () {
    return {
      meta: {
        promise: {
          method: 'GET',
          url: '/posts/1/comments'
        }
      }
    }
  },
  reducer (state) {
    return {
      ...state,
      ready: false
    }
  },
  resolve (state, { payload }) {
    return {
      ...state,
      comments: payload.data,
      ready: true
    }
  },
  reject (state) {
    return {
      ...state,
      ready: true
    }
  }
})

export const updateComment = duck.defineAction(UPDATE_COMMENT, {
  creator () {
    return {
      meta: {
        promise: {
          method: 'PUT',
          url: '/posts/1/comment'
        }
      }
    }
  },
  reducer (state) {
    return {
      ...state,
      ready: false
    }
  },
  resolve (state, { payload }) {
    return {
      ...state,
      comments: (state.comments || []).filter(comment => {
        if (comment.id !== payload.data.id) return comment
      }),
      ready: true
    }
  },
  reject (state) {
    return {
      ...state,
      ready: true
    }
  }
})

export const postComment = duck.defineAction(ADD_COMMENT, {
  creator (newComment) {
    return {
      meta: {
        promise: {
          method: 'POST',
          url: '/posts/1/comments/fail',
          data: { ...newComment }
        },
        optimist: true
      }
    }
  },
  reducer (state, { payload }) {
    return {
      ...state,
      comments: (state.posts || []).concat(payload.newComment)
    }
  }
})

export default duck.reducer
