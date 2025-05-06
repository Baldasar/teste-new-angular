import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormlyModule, FormlyBootstrapModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form = new FormGroup({});
  model: any = {};
  selectedForm: number | null = null;
  selectedFormTitle: string | null = null;

  currentFields: FormlyFieldConfig[] = [];

  formConfigs: { id: number; name: string; fields: FormlyFieldConfig[] }[] = []

  cards = [
    {
      id: 1,
      title: 'Formulário de Contato',
      description: 'Formulário para coletar informações de contato.',
      fields: [
        { text: 'Nome', key: 'name', type: 'input', required: true },
        { text: 'E-mail', key: 'email', type: 'email', required: true },
      ],
    },
    {
      id: 2,
      title: 'Formulário de Feedback',
      description: 'Formulário para coletar feedback dos usuários.',
      fields: [
        {
          text: 'Satisfação',
          key: 'satisfacao',
          type: 'radio',
          required: true,
          options: [
            { label: 'Boa', value: 'boa' },
            { label: 'Ruim', value: 'ruim' },
          ],
        },
        { text: 'Comentário', key: 'comentario', type: 'textarea', required: false },
      ],
    },
    {
      id: 3,
      title: 'Formulário de Cadastro',
      description: 'Formulário para cadastro de novos usuários.',
      fields: [
        { text: 'Nome Completo', key: 'nome', type: 'input', required: true },
        { text: 'Data de Nascimento', key: 'dataNascimento', type: 'date', required: true },
        { text: 'CPF', key: 'cpf', type: 'input', required: true },
        {
          text: 'Gênero',
          key: 'genero',
          type: 'select',
          required: true,
          options: [
            { label: 'Masculino', value: 'masculino' },
            { label: 'Feminino', value: 'feminino' },
            { label: 'Outro', value: 'outro' },
          ],
        },
      ],
    },
    {
      id: 4,
      title: 'Formulário de Pesquisa',
      description: 'Formulário para realizar pesquisas com os usuários.',
      fields: [
        { text: 'Qual sua opinião sobre o nosso serviço?', key: 'pergunta1', type: 'input', required: true },
        { text: 'O que podemos melhorar?', key: 'pergunta2', type: 'input', required: false },
      ],
    },
    {
      id: 5,
      title: 'Formulário de Inscrição',
      description: 'Formulário para inscrições em eventos.',
      fields: [
        { text: 'Nome do Evento', key: 'nomeEvento', type: 'input', required: true },
        { text: 'Data do Evento', key: 'dataEvento', type: 'date', required: true },
        { text: 'Número de Participantes', key: 'participantes', type: 'number', required: true },
      ],
    },
    {
      id: 6,
      title: 'Formulário de Enquete',
      description: 'Formulário para coletar respostas em uma enquete.',
      fields: [
        { text: 'Opção 1', key: 'opcao1', type: 'checkbox', required: false },
        { text: 'Opção 2', key: 'opcao2', type: 'checkbox', required: false },
        { text: 'Opção 3', key: 'opcao3', type: 'checkbox', required: false },
      ],
    },
  ];

  compactToFormly(fields: any[]): FormlyFieldConfig[] {
    return fields.map((field) => {
      const formlyField: FormlyFieldConfig = {
        key: field.key,
        type:
          field.type === 'email' ||
          field.type === 'date' ||
          field.type === 'number' ? 'input' :
          field.type === 'select' ? 'select' :
          field.type,
        props: {
          label: field.text,
          required: field.required || false,
          type: ['email', 'date', 'number'].includes(field.type) ? field.type : undefined,
          options: field.options || undefined,
        },
      };
  
      return formlyField;
    });
  }
  
  selecionarFormulario(id: number) {
    const card = this.cards.find((c) => c.id === id);
    if (card) {
      this.selectedForm = card.id;
      this.selectedFormTitle = card.title;
      this.currentFields = this.compactToFormly(card.fields);
      this.model = {};
      this.form = new FormGroup({});
    }
  }

  onSubmit() {
    if (this.form.valid) {
      alert('Resposta:\n' + JSON.stringify(this.model, null, 2));
    }
  }
}
