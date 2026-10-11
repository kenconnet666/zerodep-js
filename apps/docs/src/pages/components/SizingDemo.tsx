import { _component, _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
import { Search } from '@lucide/icons';
import {
  Button,
  Icon,
  LinkButton,
  ToggleButton,
  Provider,
  Spinner,
  Text,
  useCss,
  type ButtonProps,
} from 'zerodep-js-ui';

const Samples = _component(({ size, label }: { size: ButtonProps['size']; label: string }) => {
  const s = useCss();
  return (
    <div
      data-sizing-row={label}
      class={css(() => {
        s.display('flex').flexWrap('wrap').alignItems('start').gap('1rem').marginBlock('1rem');
      })}
    >
      <Button size={size} data-sizing={'text'}>
        保存
      </Button>
      <Button size={size} startIcon={<Icon icon={Search} />} data-sizing={'mixed'}>
        搜索
      </Button>
      <Button
        variant={'text'}
        size={size}
        icon={<Icon icon={Search} />}
        aria-label={'搜索 ' + label}
        data-sizing={'icon'}
      />
      <Button size={size} loading data-sizing={'loading'}>
        保存中
      </Button>
      <Button
        size={size}
        startIcon={<Icon icon={Search} />}
        data-sizing={'long'}
        class={css(() => {
          s.inlineSize('11em');
        })}
      >
        保存当前页面中的全部修改内容
      </Button>
    </div>
  );
});

export const SizingDemo = _component(() => {
  let inherited = _state(false);
  let narrow = _state(false);
  let selected = _state(false);
  return (
    <section id={'sizing-demo'} aria-labelledby={'sizing-heading'}>
      <h3 id={'sizing-heading'}>字号与 em 比例</h3>
      <p>
        正式按钮的根字号统一驱动文字、图标、间距、内边距、边框和焦点轮廓；长文字允许自然增高，纯图标模式使用方形区域。
      </p>
      <Provider class={'demo-preview'}>
        <Samples size={'14px'} label={'14'} />
        <Samples size={'_md'} label={'16'} />
        <Samples size={'1.25rem'} label={'20'} />
        <label>
          <input type={'checkbox'} bind:checked={inherited} />
          继承外围字号
        </label>
        <div style={'font-size:18px;'}>
          <Button
            size={inherited ? undefined : '14px'}
            startIcon={<Icon icon={Search} />}
            endIcon={<Spinner />}
            data-sizing-inherit
          >
            随根字号变化
          </Button>
          <Button size={'20px'} startIcon={<Icon icon={Search} size={'16px'} />} data-sizing-local>
            <Text size={'14px'} data-sizing-label>
              局部覆盖保留根字号
            </Text>
          </Button>
        </div>
        <div class={'demo-case'}>
          <h4>长标签与受限容器</h4>
          <p>不指定按钮宽度，长标签应在容器内自然换行；图标保留占位，按钮高度随文字增加。</p>
          <label>
            <input type={'checkbox'} bind:checked={narrow} />
            收窄长标签容器
          </label>
          <div
            class={'long-label-preview'}
            data-long-label-preview
            style={{ inlineSize: narrow ? '12em' : '20em' }}
          >
            <Button data-long-action={'button'} startIcon={<Icon icon={Search} />}>
              保存当前工作区中所有尚未提交的修改并同步到远程项目
            </Button>
            <LinkButton data-long-action={'link'} href={'#system'} endIcon={<Icon icon={Search} />}>
              workspace/reports/quarterly-summary-without-any-spaces
            </LinkButton>
            <ToggleButton data-long-action={'toggle'} bind:pressed={selected}>
              持续选中当前列表中所有符合筛选条件的记录
            </ToggleButton>
          </div>
        </div>
      </Provider>
      <pre>
        <code>
          {
            "<Button size={'_md'} startIcon={<Icon icon={Search} />}>搜索</Button>\n// size={undefined} 恢复继承；图标默认 1.125em，内部视觉尺寸按字号缩放。"
          }
        </code>
      </pre>
    </section>
  );
});
