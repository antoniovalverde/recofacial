import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className='ma4 mt0'>
			<p className='f3'>
				{'Este Cerebro Mágico detectará las caras de tus imágenes. Pruébalo.'}
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder={'https://image.es/imagen.jpg'} />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} >Detectar</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;
