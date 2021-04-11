import React from 'react'
import './modal.css'
export default function Modal(props) {
	let isOpen = props.isOpen || false;
	const width = props.width;
	const height = props.height;
	const minHeight = props.minHeight;
	const style = {};
	const hide = (ev) => {
		if (typeof props.onClose === 'function') {
			props.onClose(ev);
		}
	};

	if (width) {
		style.width = width + 'px';
	}
	if (height) {
		style.height = height + 'px';
	}
	if (minHeight) {
		style.minHeight = 'min(100%, ' + minHeight + 'px)';
	}

	if (!isOpen) return '';

	return (
		<div className={props.zindexMax ? "modal_outer zindexMax" : "modal_outer"} tabIndex="-1" >
			<div className="modal_inner" style={style}>
				{!props.noClose &&
					<a onClick={(ev) => hide(ev)} className="modal_close" title="Close">
						<i className="fas fa-times"></i>
					</a>
				}
				{props.children}
			</div>
		</div>
	)
}
