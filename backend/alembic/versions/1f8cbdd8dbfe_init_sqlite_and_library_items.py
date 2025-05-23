"""init sqlite and library_items

Revision ID: 1f8cbdd8dbfe
Revises: eb680b1535c5
Create Date: 2025-05-03 16:39:43.527376

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f8cbdd8dbfe'
down_revision: Union[str, None] = 'eb680b1535c5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chronic_disease_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_chronic_disease_list_id'), 'chronic_disease_list', ['id'], unique=False)
    op.create_table('library_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('icon', sa.String(), nullable=True),
    sa.Column('cover_url', sa.String(), nullable=True),
    sa.Column('link', sa.String(), nullable=True),
    sa.Column('tags', sa.Text(), nullable=True),
    sa.Column('author', sa.String(), nullable=True),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_library_items_id'), 'library_items', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('birth_year', sa.Integer(), nullable=True),
    sa.Column('height', sa.Float(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.create_table('health_params',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('height', sa.Float(), nullable=True),
    sa.Column('blood_pressure', sa.String(), nullable=True),
    sa.Column('pulse', sa.Integer(), nullable=True),
    sa.Column('sleep_hours', sa.Float(), nullable=True),
    sa.Column('mood', sa.Integer(), nullable=True),
    sa.Column('energy', sa.Integer(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_health_params_id'), 'health_params', ['id'], unique=False)
    op.create_table('lab_results',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('file_path', sa.String(), nullable=True),
    sa.Column('parsed_data', sa.Text(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_lab_results_id'), 'lab_results', ['id'], unique=False)
    op.create_table('user_chronic_disease',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('disease_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['disease_id'], ['chronic_disease_list.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'disease_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_chronic_disease')
    op.drop_index(op.f('ix_lab_results_id'), table_name='lab_results')
    op.drop_table('lab_results')
    op.drop_index(op.f('ix_health_params_id'), table_name='health_params')
    op.drop_table('health_params')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_library_items_id'), table_name='library_items')
    op.drop_table('library_items')
    op.drop_index(op.f('ix_chronic_disease_list_id'), table_name='chronic_disease_list')
    op.drop_table('chronic_disease_list')
    # ### end Alembic commands ###
