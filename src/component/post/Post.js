import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost} from "../../actions/post";
import Spinner from "../layout/Spinner";
import {Link, useParams} from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from './CommentItem';

const Post = ({post: {post, loading}, getPost}) => {
    const {id} = useParams();

    React.useEffect(() => {
        getPost(id);
    }, [getPost, loading])

    return (
        <div>
            {loading || post === null ? <Spinner /> : <Fragment>
                <Link to={'/posts'} className={'btn'}>Back To Posts</Link>
                <PostItem post={post} showItems={false} />
                <CommentForm postId={post._id} />
                <div className="comments">
                    {post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </Fragment>}
        </div>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost}) (Post);