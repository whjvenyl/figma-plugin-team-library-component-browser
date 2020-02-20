import { observable, action } from 'mobx'
import Dialog from '@/app/components/Dialog'

export default class Store {
  constructor() {
    this.listenMessage()
  }

  private listenMessage(): void {
    onmessage = (msg): void => {
      const messageType: MessageType = msg.data.pluginMessage.type

      if (messageType === 'update') {
        this.updateLibrary(msg.data.pluginMessage.data)
        console.log('library update', this.library)
      }
    }
  }

  @observable tabID: TabID = 'list'
  @observable library: Library = []

  @observable isDialogOpen = false
  @observable dialogType: 'prompt' | 'alert' = 'prompt'
  @observable dialogTitle = ''
  @observable dialogMessage?: string
  @observable dialogConfirmText?: string
  @observable dialogOnConfirm?: () => void

  @action updateTabID(tabID: TabID): void {
    this.tabID = tabID
  }

  @action private updateLibrary(library: Library): void {
    this.library = library
  }

  @action openDialog(options?: {
    dialogType: Store['dialogType']
    dialogTitle: Store['dialogTitle']
    dialogMessage?: Store['dialogMessage']
    dialogConfirmText?: Store['dialogConfirmText']
    dialogOnConfirm?: Store['dialogOnConfirm']
  }): void {
    this.isDialogOpen = true

    if (options) {
      this.dialogType = options.dialogType
      this.dialogTitle = options.dialogTitle

      if (options.dialogMessage) {
        this.dialogMessage = options.dialogMessage
      }

      if (options.dialogConfirmText) {
        this.dialogConfirmText = options.dialogConfirmText
      }

      if (options.dialogOnConfirm) {
        this.dialogOnConfirm = options.dialogOnConfirm
      }
    }
  }

  @action closeDialog(): void {
    this.isDialogOpen = false

    this.dialogMessage = undefined
    this.dialogConfirmText = undefined
    this.dialogOnConfirm = undefined
  }
}
