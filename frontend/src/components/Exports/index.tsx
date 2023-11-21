import { FC, useState } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { exportIcon } from '../../assets'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Button from '../UI/Button'
import { Variants } from '../../enums'
import Popup from '../UI/Popup'
import downloadFromUrl from '../../utils/downloadFromUrl'

interface props {
  items: {
    icon: string
    text: string
    download: () => void
  }[]
}

const Exports: FC<props> = ({ items }) => {
  const [exportShow, setExportShow] = useState(false)

  const exportRef = useOutsideClick(() => {
    setExportShow(false)
  })

  return (
    <div ref={exportRef} className='exports'>
      <Button
        type='secondary'
        variant={Variants.primary}
        text='Export'
        icon={exportIcon}
        onClick={() => setExportShow(!exportShow)}
      />
      <Popup show={exportShow && items.length !== 0} props={{ x: '-50%' }}>
        <ul className='exports-select'>
          {items.map((item, index) => (
            <li key={index} className='exports-item'>
              <button onClick={item.download} className='exports-button'>
                <ReactSVG src={item.icon} className='icon' />
                <span className='text'>{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </Popup>
    </div>
  )
}

export default Exports
