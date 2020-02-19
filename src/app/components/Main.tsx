import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { StoreType } from '@/app/store'
import List from '@/app/components/List'
import Setting from '@/app/components/Setting'

type Props = {
  store?: StoreType
}
type State = {}

@inject('store')
@observer
export default class Content extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <div>
        {this.props.store!.tabID === 'list' && <List />}
        {this.props.store!.tabID === 'setting' && <Setting />}
      </div>
    )
  }
}
